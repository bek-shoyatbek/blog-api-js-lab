import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";
import jwt from "jsonwebtoken";
import { appConfig } from "../configs";
import { AuthRequest } from "../../types";

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new AppError(401, "Token not provided!");
    }
    jwt.verify(token, appConfig.jwtSecret as string, (err, user) => {
      if (err) throw new AppError(403, "Couldn't verify token");
      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
}
