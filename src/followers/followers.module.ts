import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.entity';
import { Postt } from 'src/post/post.entity';
import { Follower } from './folowers.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Postt, Follower]),
   ],
  providers: [FollowersService],
  controllers: [FollowersController],
  exports: [FollowersService]
})
export class FollowersModule {}
