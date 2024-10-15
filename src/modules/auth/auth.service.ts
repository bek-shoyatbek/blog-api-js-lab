import { User } from "../../common/database/entities/user.entity";
import { AppDataSource } from "../../common/database";
import { generateJwtToken } from "../../common/jwt";
import { UserLoginDto, UserSignupDto } from "./dto";
import { comparePasswords, hashPassword } from "../../common/hashing";

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  static async signup(userSignupDto: UserSignupDto) {
    try {
      const isExistingEmail = await userRepository.findOneBy({
        email: userSignupDto.email,
      });
      if (isExistingEmail) {
        throw new Error("Email already exists!");
      }

      const hashedPassword = await hashPassword(userSignupDto.password);
      if (!hashedPassword) {
        throw new Error("Couldn't hash password ");
      }

      const user = new User();
      user.username = userSignupDto.username;
      user.email = userSignupDto.email;
      user.password = hashedPassword;
      const savedUser = await userRepository.save(user);

      return savedUser;
    } catch (err) {
      return err;
    }
  }

  static async login(userLoginDto: UserLoginDto) {
    try {
      const user = await userRepository.findOneBy({
        email: userLoginDto.email,
      });

      if (!user) {
        throw new Error("User with this email doesn't exist!");
      }

      const isCorrectPassword = await comparePasswords(
        userLoginDto.password,
        user.password,
      );

      if (!isCorrectPassword) {
        throw new Error("Invalid password");
      }

      const accessToken = generateJwtToken(user);

      return accessToken;
    } catch (err) {
      return err;
    }
  }
}
