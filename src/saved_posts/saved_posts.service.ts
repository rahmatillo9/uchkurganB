import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SavedPost } from './saved_posts.entity';
import { SavePostDto } from 'src/validators/saved_posts.entiy';
import { where } from 'sequelize';

@Injectable()
export class SavedPostsService {
  constructor(
    @InjectModel(SavedPost)
    private readonly savedPostModel: typeof SavedPost,
  ) {}

  async savePost(dto: SavePostDto) {
    return await this.savedPostModel.create({...dto} as SavedPost);
  }

 
  async findOne(postId: number): Promise<SavedPost> {
    const post = await this.savedPostModel.findOne({ where: { id: postId }, include: ['post'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async unsavePost(user_id: number, post_id: number) {
    return await this.savedPostModel.destroy({
      where: { user_id, post_id },
    });
  }

  async getSavedPosts(userId: number) {
    return await this.savedPostModel.findAll({ where: { user_id: userId }, include: ['post'] });
  }
}