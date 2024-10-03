import { IsEmail, IsString, MaxLength } from "class-validator";

export class UserSignupDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString({ message: "username must be a string" })
  @MaxLength(50)
  username: string;

  @IsString()
  password: string;
}
