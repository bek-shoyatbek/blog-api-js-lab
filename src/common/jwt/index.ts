import jwt from "jsonwebtoken";
import { User } from "../database/entities/user.entity";
import { appConfig } from "../configs";

export function generateJwtToken(user: User) {
  return jwt.sign(
    { userId: user.id, role: user.role },
    appConfig.jwtSecret || "lkj4joidfwlk43jeriojdkf",
    { expiresIn: "2h" },
  );
}
