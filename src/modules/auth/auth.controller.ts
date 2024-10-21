import { NextFunction, Request, Response } from "express";
import { generateJwtToken } from "../../common/jwt";
import { AuthService } from "./auth.service";
<<<<<<< HEAD
import { User } from "../../common/database/entities/user.entity";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const user = await AuthService.signup(req.body);

      if (user instanceof Error) {
        return res.status(400).json({
          message: user.message,
        });
      }

      const accessToken = generateJwtToken(user as User);
=======
import { AppError } from "../../common/errors/app-error";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.signup(req.body);

      const accessToken = generateJwtToken(user);
>>>>>>> main

      res.status(200).json({
        message: "Signed up successfully!",
        accessToken,
      });
      return;
<<<<<<< HEAD
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).json({
          message: err.message,
        });
      } else {
        return res.status(500).json({
          message: "An unknown error occurred",
        });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const accessToken = await AuthService.login(req.body);

      if (accessToken instanceof Error) {
        return res.status(400).json({
          message: accessToken.message,
        });
=======
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = await AuthService.login(req.body);

      if (!accessToken) {
        throw new AppError(500, "Couldn't get access token");
>>>>>>> main
      }

      res.status(200).json({
        message: "Logged in successfully!",
        accessToken,
      });
      return;
<<<<<<< HEAD
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).json({
          message: err.message,
        });
      }
    }
    
    }
  }

=======
    } catch (err) {
      next(err);
    }
  }
}
>>>>>>> main
