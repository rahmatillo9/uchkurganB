import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UsersController } from './user.controller';
import { BullModule } from '@nestjs/bull';
import { Like } from 'src/like/like.entity';
import { Comment } from 'src/comment/comment.entity';
import { Postt } from 'src/post/post.entity';
import { Search } from 'src/search/search.entity';



@Module({
  imports: [
    BullModule.registerQueue({
      name: 'hash-queue',
    }),
    

    SequelizeModule.forFeature([User, Search, Like, Comment, Postt ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
