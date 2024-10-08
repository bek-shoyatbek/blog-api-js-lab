import express from "express";
import "reflect-metadata";
import { errorHandler } from "./common/middlewares/error-handler.middleware";
import { AuthRouter } from "./modules/auth";
import { BlogRouter } from "./modules/blogs";
import expressSession from "express-session";
import { cookie } from "express-validator";

export const app = express();

app.use(express.json());
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 100 * 1000,
    },
  }),
);
app.use("/auth", AuthRouter);
app.use("/blogs", BlogRouter);

app.use(errorHandler);
