import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Like } from "./like.entity";
import { Postt } from "src/post/post.entity";
import { User } from "src/users/user.entity";

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like)
    private readonly likeModel: typeof Like,
  ) {}

  async create(userId: number, postId: number): Promise<Like> {
    const likeExists = await this.likeModel.findOne({ where: { userId, postId } });
    if (likeExists) throw new NotFoundException("You already liked this post.");

    return this.likeModel.create({ userId, postId } as any);
  }

  async findAll(): Promise<Like[]> {
    return this.likeModel.findAll({ include: [User, Postt] });
  }

  async findByPost(postId: number): Promise<Like[]> {
    return this.likeModel.findAll({ where: { postId }, include: [User] });
  }

  async findByUser(userId: number): Promise<Like[]> {
    return this.likeModel.findAll({ where: { userId }, include: [Postt] });
  }

  async delete(userId: number, postId: number): Promise<void> {
    const like = await this.likeModel.findOne({ where: { userId, postId } });
    if (!like) throw new NotFoundException("Like not found");

    await like.destroy();
  }
}
