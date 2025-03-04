import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { SavedPostsService } from './saved_posts.service';
import { SavePostDto } from 'src/validators/saved_posts.entiy';

@Controller('saved-posts')
export class SavedPostsController {
  constructor(private readonly savedPostsService: SavedPostsService) {}

  @Post('save')
  async save(@Body() savePostDto: SavePostDto) {
    return this.savedPostsService.savePost(savePostDto);
  }

  @Delete('unsave/:user_id/:post_id')
  async unsave(@Param('user_id') user_id: number, @Param('post_id') post_id: number) {
    return this.savedPostsService.unsavePost(user_id, post_id);
  }

  @Get('post/:postId')
    async getSavedPost(@Param('postId') postId: number) {
        return this.savedPostsService.findOne(postId);
    }

  @Get('user/:userId')
  async getSavedPosts(@Param('userId') userId: number) {
    return this.savedPostsService.getSavedPosts(userId);
  }
}
