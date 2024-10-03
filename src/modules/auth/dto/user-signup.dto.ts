import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserSignupDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsString({ message: "username must be a string" })
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
