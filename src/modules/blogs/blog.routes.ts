import { Router } from "express";
import { BlogController } from "./blog.controller";
import { authenticateToken } from "../../common/middlewares/authenticate-token";
import { checkRole } from "../../common/middlewares/check-role";

export const blogRouter = Router();

blogRouter.post("/", authenticateToken, BlogController.createBlogHandler);
blogRouter.get("/", BlogController.getBlogsHandler);
blogRouter.get("/:id", BlogController.getBlogByIdHandler);

blogRouter.put("/:id", authenticateToken, checkRole(['admin', 'user']), BlogController.updateBlogHandler);
blogRouter.delete("/:id", authenticateToken, checkRole(['admin', 'user']), BlogController.deleteBlogHandler);

blogRouter.route("/:id/comments")
    .post(authenticateToken, checkRole(['admin', 'user']), BlogController.commentBlogHandler)
    .get(BlogController.getCommentsByBlogIdHandler)
    .put(authenticateToken, checkRole(['user']), BlogController.updateBlogCommentHandler)
    .delete(authenticateToken, checkRole(['user', 'admin']), BlogController.deleteBlogCommentHandler);