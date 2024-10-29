import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types";

export function checkRole(roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You don't have permission to perform this action"
            });
        }

        next();
    };
}