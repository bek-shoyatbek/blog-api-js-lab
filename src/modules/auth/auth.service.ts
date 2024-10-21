<<<<<<< HEAD
import { User } from "../../common/database/entities/user.entity";
import { AppDataSource } from "../../common/database";
import { generateJwtToken } from "../../common/jwt";
import { UserLoginDto, UserSignupDto } from "./dto";
import { comparePasswords, hashPassword } from "../../common/hashing";
=======
import { Repository } from "typeorm";
import { User } from "../../common/database/entities/user.entity";
import { UserSignupDto } from "./dto/user-signup.dto";
import { AppDataSource } from "../../common/database";
import { comparePasswords, hashPassword } from "../../common/hashers";
import { AppError } from "../../common/errors/app-error";
import { UserLoginDto } from "./dto/user-login.dto";
import { generateJwtToken } from "../../common/jwt";
>>>>>>> main

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  static async signup(userSignupDto: UserSignupDto) {
    try {
      const isExistingEmail = await userRepository.findOneBy({
        email: userSignupDto.email,
      });
      if (isExistingEmail) {
<<<<<<< HEAD
        throw new Error("Email already exists!");
=======
        throw new AppError(400, "Email already exists!");
>>>>>>> main
      }

      const hashedPassword = await hashPassword(userSignupDto.password);
      if (!hashedPassword) {
<<<<<<< HEAD
        throw new Error("Couldn't hash password ");
=======
        throw new AppError(500, "Couldn't hash password ");
>>>>>>> main
      }

      const user = new User();
      user.username = userSignupDto.username;
      user.email = userSignupDto.email;
      user.password = hashedPassword;
      const savedUser = await userRepository.save(user);

      return savedUser;
    } catch (err) {
<<<<<<< HEAD
      return err;
=======
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error signing up");
>>>>>>> main
    }
  }

  static async login(userLoginDto: UserLoginDto) {
    try {
      const user = await userRepository.findOneBy({
        email: userLoginDto.email,
      });

      if (!user) {
<<<<<<< HEAD
        throw new Error("User with this email doesn't exist!");
=======
        throw new AppError(400, "User with this email doesn't exist!");
>>>>>>> main
      }

      const isCorrectPassword = await comparePasswords(
        userLoginDto.password,
        user.password,
      );

      if (!isCorrectPassword) {
<<<<<<< HEAD
        throw new Error("Invalid password");
=======
        throw new AppError(400, "Invalid password");
>>>>>>> main
      }

      const accessToken = generateJwtToken(user);

      return accessToken;
    } catch (err) {
<<<<<<< HEAD
      return err;
=======
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error logging in");
>>>>>>> main
    }
  }
}
