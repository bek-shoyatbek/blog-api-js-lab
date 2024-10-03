import { NextFunction, Request, Response } from "express";
import { generateJwtToken } from "../../common/jwt";
import { AuthService } from "./auth.service";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.signup(req.body);

      const accessToken = generateJwtToken(user);

      res.status(200).json({
        message: "Signed up successfully!",
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {}
  }
}
