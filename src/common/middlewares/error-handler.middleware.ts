import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal server error",
  });
  return;
};
