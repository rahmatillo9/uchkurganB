import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Follower } from './folowers.entity';
import { FollowDto } from 'src/validators/folowers.validator';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower)
    private readonly followerModel: typeof Follower,
  ) {}

  async toggleFollow(dto: FollowDto) {
    try {
      const existingFollow = await this.followerModel.findOne({
        where: { follower_id: dto.follower_id, following_id: dto.following_id },
      });

      if (existingFollow) {
        await existingFollow.destroy();
        return { message: "Obunadan chiqildi", following_id: dto.following_id, follower_id: dto.follower_id };
      }

      await this.followerModel.create({ follower_id: dto.follower_id, following_id: dto.following_id } as any);
      return { message: "Obuna bo‘ldi", following_id: dto.following_id, follower_id: dto.follower_id };
    } catch (error) {
      throw new Error("Follow/Unfollow qilishda xatolik: " + error.message);
    }
  }

  async getFollowers(userId: number) {
    const followers = await this.followerModel.findAll({ where: { following_id: userId }, include: ['follower'] });
    return { userId, followers };
  }
  async getFollowing(userId: number) {
    const following = await this.followerModel.findAll({
      where: { follower_id: userId },
      include: ['following']
    });
    return { userId, following };
  }

  async isFollowing(follower_id: number, following_id: number) {
    const follow = await this.followerModel.findOne({ where: { follower_id, following_id } });
    return { follower_id, following_id, isFollowing: !!follow };
  }
}
