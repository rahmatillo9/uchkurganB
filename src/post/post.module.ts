import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from 'src/like/like.entity';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Category } from 'src/category/category.entity';
import { Postt } from './post.entity';

@Module({
        imports: [
          SequelizeModule.forFeature([Postt, Like, User, Comment, Category ]),
        ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
