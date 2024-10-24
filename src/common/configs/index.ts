import dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { User } from "../database/entities/user.entity";
import { Blog } from "../database/entities/blog.entity";
import { Comment } from "../database/entities/comment.entity";

dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Blog, Comment],
};

export const appConfig = {
  port: process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET,
};
