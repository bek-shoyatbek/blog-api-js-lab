import { commentRepository } from "../../common/database";
import { Blog } from "../../common/database/entities/blog.entity";
import { Comment } from "../../common/database/entities/comment.entity";
import { User } from "../../common/database/entities/user.entity";

export class CommentService {
    static async addComment(user: User, blog: Blog, comment: string) {
        const newComment = new Comment();
        newComment.content = comment;
        newComment.user = user;
        newComment.blog = blog;
        const createdComment = await commentRepository.save(newComment);
        return { user: user.id, comment: createdComment.content };
    }

    static async getCommentsByBlogId(blogId: string) {
        const comments = await commentRepository
            .createQueryBuilder("comment")
            .where("comment.blogId = :blogId", { blogId })
            .leftJoinAndSelect("comment.user", "user")
            .select(["comment.id", "comment.content", "user.id", "user.username"])
            .getMany();
        return comments;
    }

    static async updateComment(commentId: string, updatedComment: string) {
        const comment = await commentRepository.findOneBy({ id: commentId });
        if (!comment) {
            return null;
        }

        comment.content = updatedComment;
        return await commentRepository.save(comment);
    }

    static async deleteComment(commentId: string) {
        const comment = await commentRepository.findOneBy({ id: commentId });
        if (!comment) {
            return null;
        }
        return await commentRepository.remove(comment);
    }
}