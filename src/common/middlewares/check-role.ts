import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types";

export function checkRole(roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                message: "You don't have permission to perform this action"
            });
            return;
        }

        next();
    };
}