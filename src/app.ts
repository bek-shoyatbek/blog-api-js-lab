import express from "express";
import "reflect-metadata";
import { errorHandler } from "./common/middlewares/error-handler.middleware";

export const app = express();

app.use(express.json());

app.use("*", errorHandler);
