import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Postt } from './post.entity';
import { PostDto } from 'src/validators/post.validator';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Like } from 'src/like/like.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Postt) private postModel: typeof Postt) {}

  async create(createPostDto: PostDto){
  return this.postModel.create({...createPostDto} as Postt);
  }

  async findAll(): Promise<Postt[]> {
    const posts = await this.postModel.findAll({
      
      order: [['createdAt', 'DESC']],  // Eng oxirgi yuklangan postni birinchi chiqarish
     
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id','nickname', 'profile_image'],
        },

        {
          model: Comment,
          as: 'comments',
          attributes: ['user_id', 'content'],
          include: [ // Comment modeliga bog'langan Userni ham olib kelamiz
            {
              model: User,
              as: 'user',
              attributes: ['id', 'nickname', 'profile_image']
            }
          ]
        }
    

    
      ],
    });

  
    return posts;

    
  }

  async findByUserId(userId: number): Promise<Postt[]> {
    const posts = await this.postModel.findAll({
      order: [['createdAt', 'DESC']],  // Eng oxirgi yuklangan postni birinchi chiqarish
     
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'nickname', 'profile_image'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['user_id', 'content'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'nickname', 'profile_image'],
            },
          ],
        },
      ],
    });
  
    if (!posts || posts.length === 0) {
      throw new NotFoundException('Post not found');
    }
  
    // Har bir post uchun `views_count` ni oshirish
    await Promise.all(posts.map(post => post.increment('views_count', { by: 1 })));
  
    return posts;
  }
  


  async findOne(postId: number): Promise<Postt> {
    const post = await this.postModel.findByPk(postId, {
     
      include: [
        {
          model: User,
          as: 'user',
          attributes: [ 'id', 'nickname', 'profile_image'],
        },

        {
          model: Comment,
          as: 'comments',
          attributes: ['user_id', 'content'],
          include: [ // Comment modeliga bog'langan Userni ham olib kelamiz
            {
              model: User,
              as: 'user',
              attributes: ['id', 'nickname', 'profile_image']
            }
          ]
        }
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
