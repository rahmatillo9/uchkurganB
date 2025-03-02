import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Like } from "./like.entity";
import { LikeDto } from "src/validators/like.validator";


@Injectable()
export class LikeService {
    constructor(@InjectModel(Like) private readonly likeModel: typeof Like) {}

    async addLike(dto: LikeDto) {
        try {
            const existingLike = await this.likeModel.findOne({
                where: { userId: dto.userId, postId: dto.postId },
            });

            if (existingLike) {
                await existingLike.destroy();
                return { message: "Like olib tashlandi", postId: dto.postId, userId: dto.userId };
            }

            await this.likeModel.create({ userId: dto.userId, postId: dto.postId } as any);
            return { message: "Like qo‘shildi", postId: dto.postId, userId: dto.userId };
        } catch (error) {
            throw new Error("Liking post failed: " + error.message);
        }
    }

    async getPostLikes(postId: number) {
        const count = await this.likeModel.count({ where: { postId } });
        return { postId, likesCount: count };
    }

    async hasUserLikedPost(userId: number, postId: number) {
        const like = await this.likeModel.findOne({ where: { userId, postId } });
        return { userId, postId, hasLiked: !!like };
    }
}