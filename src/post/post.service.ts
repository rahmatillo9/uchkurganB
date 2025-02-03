import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Postt } from './post.entity';
import { PostDto } from 'src/validators/post.validator';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Postt) private postModel: typeof Postt) {}

  async create(createPostDto: PostDto){
    const postData = {
        user_id: createPostDto.user_id,
        category_id: createPostDto.category_id,
        title: createPostDto.title,
        content: createPostDto.content,
        contact_info: createPostDto.contact_info,
        image: createPostDto.image,
        views_count: createPostDto.views_count,
        likes_count: createPostDto.likes_count,

    }
    return this.postModel.create(postData as any);
  }

  async findAll(): Promise<Postt[]> {
    return await this.postModel.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['nickname', 'profile_image'],
        },
      ],
    });
  }

  async findByUserId(userId: number): Promise<Postt[]> {
    return await this.postModel.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['nickname', 'profile_image'],
        },
      ],
    });
  }

  async findOne(postId: number): Promise<Postt> {
    const post = await this.postModel.findByPk(postId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['nickname', 'profile_image'],
        },
      ],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await post.increment('views_count', { by: 1 });
    return post;
  }

  async update(id: number, updatePostDto: PostDto): Promise<Postt> {
    const post = await this.findOne(id);
    await post.update(updatePostDto);
    return post;
  }

  async delete(id: number): Promise<void> {
    const post = await this.findOne(id);
    await post.destroy();
  }
}
