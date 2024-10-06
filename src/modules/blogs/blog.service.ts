import { Blog, blogRepository, userRepository } from "../../common/database";
import { AppError } from "../../common/errors/app-error";
import { CreateBlogDto } from "./dto/create-blog.dto";

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
}
