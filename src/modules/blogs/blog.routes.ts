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

BlogRouter.get("/", authenticateToken, BlogController.getMyBlogsHandler);
BlogRouter.get("/public", BlogController.getPublicBlogsHandler);
BlogRouter.get("/:id", authenticateToken, BlogController.getBlogByIdHandler);
BlogRouter.put("/:id", authenticateToken, BlogController.updateBlogHandler);
BlogRouter.delete("/:id", authenticateToken, BlogController.deleteBlogHandler);
