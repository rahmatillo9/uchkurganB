import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from 'src/like/like.entity';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Postt } from './post.entity';
import { PostImage } from 'src/postImage/postImage.entity';

@Module({
        imports: [
          SequelizeModule.forFeature([Postt, Like, User, Comment,  PostImage ]),
        ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
