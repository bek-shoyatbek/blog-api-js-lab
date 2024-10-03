import { Repository } from "typeorm";
import { User } from "../../common/database/entities/user.entity";
import { UserSignupDto } from "./dto/user-signup.dto";
import { AppDataSource } from "../../common/database";
import { hashPassword } from "../../common/hashers";

export class AuthService {
  constructor(private readonly userRepository: Repository<User>) {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async signup(userSignupDto: UserSignupDto) {
    const isExistingEmail = await this.userRepository.findOneBy({
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
    const result = await this.userRepository.save(user);

    return result;
  }
}
