import express from "express";
import "reflect-metadata";
<<<<<<< HEAD
import { AuthRouter } from "./modules/auth/auth.router";
=======
import { errorHandler } from "./common/middlewares/error-handler.middleware";
import { AuthRouter } from "./modules/auth/auth.routes";
>>>>>>> main

export const app = express();

app.use(express.json());
<<<<<<< HEAD

app.use("/auth", AuthRouter);
=======
app.use("/auth", AuthRouter);

app.use(errorHandler);
>>>>>>> main
