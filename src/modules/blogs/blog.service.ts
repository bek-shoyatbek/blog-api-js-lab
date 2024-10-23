import { AppDataSource, blogRepository } from "../../common/database";
import { Blog } from "../../common/database/entities/blog.entity";
import { User } from "../../common/database/entities/user.entity";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

export class BlogService {
  static async create(user: User, createBlogDto: CreateBlogDto) {
    const newBlog = new Blog();
    newBlog.title = createBlogDto.title;
    newBlog.content = createBlogDto.content;
    newBlog.tags = createBlogDto.tags;
    newBlog.user = user;
    const blog = await blogRepository.save(newBlog);
    return blog;
  }

  static async getBlogs(take: number, skip: number) {
    const blogs = await blogRepository.find({
      relations: ["user"],
      take: take,
      skip: skip,
      order: { created_at: "DESC" },
    });
    return blogs;
  }

  static async getById(id: string) {
    const blog = await blogRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    return blog;
  }

  static async update(currentBlog: Blog, updateBlogDto: UpdateBlogDto) {
    Object.assign(currentBlog, updateBlogDto);
    const updatedBlog = await blogRepository.save(currentBlog);
    return updatedBlog;
  }

  static async delete(blog: Blog) {
    return await blogRepository.remove(blog);
  }
}
