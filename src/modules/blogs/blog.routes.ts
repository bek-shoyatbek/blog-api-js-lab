import { Router } from "express";
import { BlogController } from "./blog.controller";
import { authenticateToken } from "../../common/middlewares/authenticate-token";

export const blogRouter = Router();

blogRouter.post("/", authenticateToken, BlogController.createBlogHandler);
blogRouter.get("/", BlogController.getBlogsHandler);
blogRouter.get("/:id", authenticateToken, BlogController.getBlogByIdHandler);
blogRouter.put("/:id", authenticateToken, BlogController.updateBlogHandler);
blogRouter.delete("/:id", authenticateToken, BlogController.deleteBlogHandler);
