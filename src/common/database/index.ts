import { AppDataSource } from "./datasource";
import { Blog } from "./entities/blog.entity";
import { Comment } from "./entities/comment.entity";
import { User } from "./entities/user.entity";

export * from "./datasource";
export * from "./entities/user.entity";
export * from "./entities/blog.entity";
export * from "./entities/comment.entity";

export const userRepository = AppDataSource.getRepository(User);
export const blogRepository = AppDataSource.getRepository(Blog);
export const commentRepository = AppDataSource.getRepository(Comment);
