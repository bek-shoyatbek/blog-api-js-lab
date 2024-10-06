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
      return;
    } catch (err) {
      next(err);
    }
  }
}
