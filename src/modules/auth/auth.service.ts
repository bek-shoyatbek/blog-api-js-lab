import { User } from "../../common/database/entities/user.entity";
import { UserSignupDto } from "./dto/user-signup.dto";
import { userRepository } from "../../common/database";
import { comparePasswords, hashPassword } from "../../common/hashers";
import { AppError } from "../../common/errors/app-error";
import { UserLoginDto } from "./dto/user-login.dto";
import { generateJwtToken } from "../../common/jwt";

export class AuthService {
  static async signup(userSignupDto: UserSignupDto) {
    try {
      const isExistingEmail = await userRepository.findOneBy({
        email: userSignupDto.email,
      });
      if (isExistingEmail) {
        throw new AppError(400, "Email already exists!");
      }

      const hashedPassword = await hashPassword(userSignupDto.password);
      if (!hashedPassword) {
        throw new AppError(500, "Couldn't hash password ");
      }

      const user = new User();
      user.username = userSignupDto.username;
      user.email = userSignupDto.email;
      user.password = hashedPassword;
      const savedUser = await userRepository.save(user);

      return savedUser;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error signing up");
    }
  }

  static async login(userLoginDto: UserLoginDto) {
    try {
      const user = await userRepository.findOneBy({
        email: userLoginDto.email,
      });

      if (!user) {
        throw new AppError(400, "User with this email doesn't exist!");
      }

      const isCorrectPassword = await comparePasswords(
        userLoginDto.password,
        user.password,
      );

      if (!isCorrectPassword) {
        throw new AppError(400, "Invalid password");
      }

      const accessToken = generateJwtToken(user);

      return accessToken;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error logging in");
    }
  }
}
