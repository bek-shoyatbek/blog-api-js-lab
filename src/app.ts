import express from "express";
import "reflect-metadata";
import { errorHandler } from "./common/middlewares/error-handler.middleware";
import { AuthRouter } from "./modules/auth";

export const app = express();

app.use(express.json());
app.use("/auth", AuthRouter);

app.use(errorHandler);
