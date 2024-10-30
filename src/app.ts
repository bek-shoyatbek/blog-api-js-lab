import express from "express";
import "reflect-metadata";
import { AuthRouter } from "./modules/auth/auth.router";
import { blogRouter } from "./modules/blogs";
import { userRouter } from "./modules/users/user.routes";

export const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/blogs", blogRouter);
app.use("/users", userRouter);
