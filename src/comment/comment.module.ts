import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.entity';
import { Postt } from 'src/post/post.entity';
import { User } from 'src/users/user.entity';

@Module({
    imports: [
      SequelizeModule.forFeature([Comment, Postt, User]),
    ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
