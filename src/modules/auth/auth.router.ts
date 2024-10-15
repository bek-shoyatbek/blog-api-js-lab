import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "./auth.controller";


export const AuthRouter = Router();

AuthRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.signup(req, res);
  } catch (error) {
    next(error);
  }
});

AuthRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.login(req, res);
  } catch (error) {
    next(error);
  }
});
