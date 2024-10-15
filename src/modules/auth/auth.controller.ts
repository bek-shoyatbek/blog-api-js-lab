import { NextFunction, Request, Response } from "express";
import { generateJwtToken } from "../../common/jwt";
import { AuthService } from "./auth.service";
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

      res.status(200).json({
        message: "Signed up successfully!",
        accessToken,
      });
      return;
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
      }

      res.status(200).json({
        message: "Logged in successfully!",
        accessToken,
      });
      return;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).json({
          message: err.message,
        });
      }
    }
    
    }
  }

