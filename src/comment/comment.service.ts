import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./comment.entity";
import { Postt } from "src/post/post.entity";
import { User } from "src/users/user.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  async create(user_id: number, post_id: number, content: string): Promise<Comment> {
    return this.commentModel.create({ user_id, post_id, content } as any);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll({ include: [User, Postt] });
  }

  async findByPost(post_id: number): Promise<Comment[]> {
    return this.commentModel.findAll({ where: { post_id }, include: [User] });
  }

  async findByUser(user_id: number): Promise<Comment[]> {
    return this.commentModel.findAll({ where: { user_id }, include: [Postt] });
  }

  async update(id: number, content: string): Promise<Comment> {
    const comment = await this.commentModel.findByPk(id);
    if (!comment) throw new NotFoundException("Comment not found");

    comment.content = content;
    await comment.save();
    return comment;
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentModel.findByPk(id);
    if (!comment) throw new NotFoundException("Comment not found");

    await comment.destroy();
  }
}
