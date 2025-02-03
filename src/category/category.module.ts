import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.entity';
import { Postt } from 'src/post/post.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Postt]),
  ],
 
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
