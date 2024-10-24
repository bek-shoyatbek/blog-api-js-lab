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

}