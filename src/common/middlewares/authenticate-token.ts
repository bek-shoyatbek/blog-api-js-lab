import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../configs";
import { AuthRequest, UserPayload } from "../../types";

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not provided!" });
    }

    jwt.verify(token, appConfig.jwtSecret as string, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Couldn't verify token" });
      }
      req.user = user as UserPayload;
      next();
    });
  } catch (err) {
    next(err);
  }
}
