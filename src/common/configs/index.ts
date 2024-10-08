import dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";

dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const appConfig = {
  port: process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET,
};
