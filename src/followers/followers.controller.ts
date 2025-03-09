import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowDto } from 'src/validators/folowers.validator';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  // ✅ Follow yoki Unfollow qilish (Toggle)
  @Post('toggle')
  async toggleFollow(@Body() dto: FollowDto) {
    return await this.followersService.toggleFollow(dto);
  }

  // ✅ Foydalanuvchining obunachilarini olish
  @Get()
  async getFollowers(@Query('userId') userId: number) {
    return await this.followersService.getFollowers(userId);
  }

  // ✅ Foydalanuvchi kimlarni follow qilganini olish
  @Get('following')
  async getFollowing(@Query('userId') userId: number) {
    return await this.followersService.getFollowing(userId);
  }

  // ✅ Foydalanuvchi kimnidir follow qilgan yoki qilmaganini tekshirish
  @Get('check')
  async isFollowing(
    @Query('follower_id') follower_id: number,
    @Query('following_id') following_id: number,
  ) {
    return await this.followersService.isFollowing(follower_id, following_id);
  }
}
