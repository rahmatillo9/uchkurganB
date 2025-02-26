import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostImage } from "./postImage.entity";
import { PostImageService } from "./post-image.service";
import { PostImageController } from "./post-image.controller";
import { Postt } from "src/post/post.entity";

@Module({
  imports: [SequelizeModule.forFeature([PostImage, Postt])],
  controllers: [PostImageController],
  providers: [PostImageService],
  exports: [PostImageService],
})
export class PostImageModule {}
