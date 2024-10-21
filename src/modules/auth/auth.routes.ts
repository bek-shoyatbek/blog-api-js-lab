import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateDto } from "../../common/validators";
import { UserSignupDto } from "./dto/user-signup.dto";
import { UserLoginDto } from "./dto/user-login.dto";

export const AuthRouter = Router();

AuthRouter.post("/signup", validateDto(UserSignupDto), AuthController.signup);

AuthRouter.post("/login", validateDto(UserLoginDto), AuthController.login);
