import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Like } from "./like.entity";
import { Postt } from "src/post/post.entity";
import { User } from "src/users/user.entity";

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like) private readonly likeModel: typeof Like,
    @InjectModel(Postt) private readonly postModel: typeof Postt, // 🔥 InjectModel qo‘shildi
  ) {}

  async toggleLike(userId: number, postId: number): Promise<void> {
    const existingLike = await this.likeModel.findOne({ where: { userId, postId } });
  
    if (existingLike) {
      // Postni topib, likes_count ni tekshiramiz
      const post = await this.postModel.findByPk(postId);
      if (post && post.likes_count > 0) {
        await this.postModel.increment('likes_count', { by: -1, where: { id: postId } });
      }
  
      // Like ni o‘chiramiz
      await existingLike.destroy();
    } else {
      // Yangi like qo‘shamiz va likes_count ni oshiramiz
      await this.likeModel.create({ userId, postId } as Like);
      await this.postModel.increment('likes_count', { by: 1, where: { id: postId } });
    }
  }
  

  
  async findAll(): Promise<Like[]> {
    return this.likeModel.findAll({ include: [User, Postt] });
  }

  async findByPost(postId: number): Promise<Like[]> {
    return this.likeModel.findAll({ where: { postId }, include: [User] }); // 🔥 isLiked olib tashlandi
  }

  async findByUser(userId: number): Promise<Like[]> {
    return this.likeModel.findAll({ where: { userId }, include: [Postt] }); // 🔥 isLiked olib tashlandi
  }

  async delete(userId: number, postId: number): Promise<void> {
    const like = await this.likeModel.findOne({ where: { userId, postId } });
    if (!like) throw new NotFoundException("Like not found");

    await like.destroy();
    await this.postModel.increment('likes_count', { by: -1, where: { id: postId } }); // 🔥 likes_count yangilanadi
  }
}
