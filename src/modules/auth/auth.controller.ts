import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {}
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {}
  }
}
