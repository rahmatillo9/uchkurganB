import { Module } from '@nestjs/common';
import { SavedPostsService } from './saved_posts.service';
import { SavedPostsController } from './saved_posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SavedPost } from './saved_posts.entity';
import { User } from 'src/users/user.entity';
import { Postt } from 'src/post/post.entity';

@Module({
  imports: [
   SequelizeModule.forFeature([SavedPost, User, Postt]),
  ],
  providers: [SavedPostsService],
  controllers: [SavedPostsController],
  exports: [SavedPostsService]
})
export class SavedPostsModule {}
