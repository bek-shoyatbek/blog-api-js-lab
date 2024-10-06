import { NextFunction, Request, Response } from "express";
import { BlogService } from "./blog.service";
import { AuthRequest } from "../../types";

export class BlogController {
  static async createBlogHandler(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = req.user;
      const blog = await BlogService.create(user.userId, req.body);
      res.status(201).json({
        message: "Blog created successfully",
        data: blog,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllBlogsHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const take = req.query?.take || 20;
      const skip = req.query?.skip || 0;
      const blogs = await BlogService.getAll(take as number, skip as number);
      res.status(200).json({
        message: "Blogs fetched successfully",
        data: blogs,
      });
    } catch (err) {
      next(err);
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
      next(err);
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
      const updatedBlog = await BlogService.update(
        blogId,
        user.userId,
        req.body,
      );
      res.status(200).json({
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    } catch (err) {
      next(err);
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
      const result = await BlogService.delete(blogId, user.userId);
      res.status(200).json({
        message: result.message,
      });
    } catch (err) {
      next(err);
    }
  }
}
