import { NextFunction, Request, Response } from "express";
import { generateJwtToken } from "../../common/jwt";
import { AuthService } from "./auth.service";
import { AppError } from "../../common/errors/app-error";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.signup(req.body);

      const accessToken = generateJwtToken(user);

      res.status(200).json({
        message: "Signed up successfully!",
        accessToken,
      });
      return;
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = await AuthService.login(req.body);

      if (!accessToken) {
        throw new AppError(500, "Couldn't get access token");
      }

      res.status(200).json({
        message: "Logged in successfully!",
        accessToken,
      });
      return;
    } catch (err) {
      next(err);
    }
  }
}
