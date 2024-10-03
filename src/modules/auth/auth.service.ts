import { Repository } from "typeorm";
import { User } from "../../common/database/entities/user.entity";
import { UserSignupDto } from "./dto/user-signup.dto";
import { AppDataSource } from "../../common/database";
import { hashPassword } from "../../common/hashers";
import { AppError } from "../../common/errors/app-error";

const userRepository = AppDataSource.getRepository(User);

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
      const result = await userRepository.save(user);

      return result;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error signing up");
    }
  }
}
