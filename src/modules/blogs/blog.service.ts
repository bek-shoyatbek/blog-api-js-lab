import { Blog, blogRepository, userRepository } from "../../common/database";
import { AppError } from "../../common/errors/app-error";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

export class BlogService {
  static async create(userId: string, createBlogDto: CreateBlogDto) {
    try {
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new AppError(400, "User with this id does not exist");
      }
      const newBlog = new Blog();
      newBlog.title = createBlogDto.title;
      newBlog.content = createBlogDto.content;
      newBlog.tags = createBlogDto.tags;
      newBlog.user = user;
      const blog = await blogRepository.save(newBlog);
      return { ...blog, user: blog.user.username };
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error creating new blog");
    }
  }

  static async getAll() {
    try {
      const blogs = await blogRepository.find({
        relations: ["user"],
        order: { created_at: "DESC" },
      });
      return blogs.map((blog) => ({
        ...blog,
        user: blog.user.username,
      }));
    } catch (err) {
      throw new AppError(500, "Error fetching blogs");
    }
  }

  static async getById(id: string) {
    try {
      const blog = await blogRepository.findOne({
        where: { id },
        relations: ["user"],
      });
      if (!blog) {
        throw new AppError(404, "Blog not found");
      }
      return { ...blog, user: blog.user.username };
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error fetching blog");
    }
  }

  static async update(
    id: string,
    userId: string,
    updateBlogDto: UpdateBlogDto,
  ) {
    try {
      const blog = await blogRepository.findOne({
        where: { id },
        relations: ["user"],
      });
      if (!blog) {
        throw new AppError(404, "Blog not found");
      }
      if (blog.user.id !== userId) {
        throw new AppError(403, "You are not authorized to update this blog");
      }
      Object.assign(blog, updateBlogDto);
      const updatedBlog = await blogRepository.save(blog);
      return { ...updatedBlog, user: updatedBlog.user.username };
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error updating blog");
    }
  }

  static async delete(id: string, userId: string) {
    try {
      const blog = await blogRepository.findOne({
        where: { id },
        relations: ["user"],
      });
      if (!blog) {
        throw new AppError(404, "Blog not found");
      }
      if (blog.user.id !== userId) {
        throw new AppError(403, "You are not authorized to delete this blog");
      }
      await blogRepository.remove(blog);
      return { message: "Blog successfully deleted" };
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(500, "Error deleting blog");
    }
  }
}
