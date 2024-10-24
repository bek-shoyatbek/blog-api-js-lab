import { NextFunction, Request, Response } from "express";
import { BlogService } from "./blog.service";
import { AuthRequest } from "../../types";
import { userRepository } from "../../common/database";
import { CommentService } from "../comments/comment.service";

export class BlogController {
  static async createBlogHandler(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userRepository.findOneBy({ id: req.user.userId });
      if (!user) {
        res.status(400).json({ message: "User with this id does not exist" });
        return;
      }
      const blog = await BlogService.create(req.user.userId, req.body);
      res.status(201).json({
        message: "Blog created successfully",
        data: blog,
      });
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  static async getBlogsHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const take = req.query?.take || 20;
      const skip = req.query?.skip || 0;
      const blogs = await BlogService.getBlogs(take as number, skip as number);
      res.status(200).json({
        message: "Blogs fetched successfully",
        data: blogs,
      });
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  static async getBlogByIdHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const blogId = req.params.id;
      const blog = await BlogService.getById(blogId);
      res.status(200).json({
        message: "Blog fetched successfully",
        data: blog,
      });
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  static async updateBlogHandler(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = req.user;
      const blogId = req.params.id;
      const blog = await BlogService.getById(blogId);
      if (!blog) {
        res.status(404).send({ message: "Blog with id not found" });
        return;
      }

      if (blog.user.id !== user.userId && user.userRole === "user") {
        res
          .status(403)
          .json({ message: "You are not authorized to update this blog" });
        return;
      }

      const updatedBlog = await BlogService.update(blog, req.body);

      res.status(200).json({
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  static async deleteBlogHandler(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = req.user;
      const blogId = req.params.id;
      const blog = await BlogService.getById(blogId);
      if (!blog) {
        res.status(400).json({ message: "Blog not found" });
        return;
      }

      if (blog.user.id !== user.userId && user.userRole === "user") {
        res
          .status(403)
          .json({ message: "You are not authorized to delete this blog" });
        return;
      }
      const result = await BlogService.delete(blog);
      res.status(200).json({
        message: result,
      });
      return;
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  static async commentBlogHandler(
    req: AuthRequest,
    res: Response) {
    try {
      const comment = req.body.comment;

      if (!comment) {
        res.status(400).json({ message: "Comment is required" });
        return;
      }

      const user = await userRepository.findOneBy({ id: req.user.userId });
      if (!user) {
        res.status(400).json({ message: "User with this id does not exist" });
        return;
      }
      const blogId = req.params.id;
      const blog = await BlogService.getById(blogId);
      if (!blog) {
        res.status(400).json({ message: "Blog not found" });
        return;
      }

      if (blog.user.id !== user.id && user.role === "user") {
        res
          .status(403)
          .json({ message: "You are not authorized to comment on this blog" });
        return;
      }
      const result = await CommentService.addComment(user, blog, comment);
      res.status(200).json({
        result,
      });
      return;
    }
    catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    }
  }

  static async getCommentsByBlogIdHandler(
    req: Request,
    res: Response,
  ) {
    try {
      const blogId = req.params.id;
      const comments = await CommentService.getCommentsByBlogId(blogId);
      res.status(200).json({
        message: "Comments fetched successfully",
        data: comments,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    }
  }

}
