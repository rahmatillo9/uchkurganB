import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowDto } from 'src/validators/folowers.validator';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post('follow')
  async follow(@Body() followDto: FollowDto) {
    return this.followersService.followUser(followDto);
  }

  @Delete('unfollow/:follower_id/:following_id')
  async unfollow(@Param('follower_id') follower_id: number, @Param('following_id') following_id: number) {
    return this.followersService.unfollowUser(follower_id, following_id);
  }

  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: number) {
    return this.followersService.getFollowers(userId);
  }

  @Get('following/:userId')
  async getFollowing(@Param('userId') userId: number) {
    return this.followersService.getFollowing(userId);
  }
}
