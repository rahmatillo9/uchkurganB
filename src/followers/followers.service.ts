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

  async followUser(dto: FollowDto) {
    return await this.followerModel.create({...dto} as Follower);
  }

  async unfollowUser(follower_id: number, following_id: number) {
    return await this.followerModel.destroy({
      where: { follower_id, following_id },
    });
  }

  async getFollowers(userId: number) {
    return await this.followerModel.findAll({ where: { following_id: userId }, include: ['follower'] });
  }

  async getFollowing(userId: number) {
    return await this.followerModel.findAll({ where: { follower_id: userId }, include: ['following'] });
  }
}
