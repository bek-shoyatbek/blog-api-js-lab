import express from "express";
import { authenticateToken } from "../../common/middlewares/authenticate-token";
import { checkRole } from "../../common/middlewares/check-role";
import { UserController } from "./user.controller";

export const userRouter = express.Router();

// Only admins can promote/demote users
userRouter.put(
    "/promote/:userId",
    authenticateToken,
    checkRole(['admin']),
    UserController.promoteUser
);

userRouter.put(
    "/demote/:userId",
    authenticateToken,
    checkRole(['admin']),
    UserController.demoteUser
);
