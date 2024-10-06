import { Router } from "express";
import { BlogController } from "./blog.controller";
import { validateDto } from "../../common/validators";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { authenticateToken } from "../../common/middlewares/authenticate-token";

export const BlogRouter = Router();

BlogRouter.post(
  "/",
  authenticateToken,
  validateDto(CreateBlogDto),
  BlogController.createBlogHandler,
);

BlogRouter.get("/");
BlogRouter.put("/");
BlogRouter.delete("/");
