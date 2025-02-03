import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './like.entity';
import { Postt } from 'src/post/post.entity';
import { User } from 'src/users/user.entity';

@Module({
      imports: [
        SequelizeModule.forFeature([Like, Postt, User]),
      ],
  providers: [LikeService],
  controllers: [LikeController]
})
export class LikeModule {}
