import { Controller, Post, Get, Delete, Param } from "@nestjs/common";
import { LikeService } from "./like.service";

@Controller("likes")
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(":userId/:postId")
  async create(
    @Param("userId") userId: string,
    @Param("postId") postId: string
  ) {
    return this.likeService.create(parseInt(userId), parseInt(postId));
  }

  @Get()
  async findAll() {
    return this.likeService.findAll();
  }

  @Get("post/:postId")
  async findByPost(@Param("postId") postId: string) {
    return this.likeService.findByPost(parseInt(postId));
  }

  @Get("user/:userId")
  async findByUser(@Param("userId") userId: string) {
    return this.likeService.findByUser(parseInt(userId));
  }

  @Delete(":userId/:postId")
  async delete(
    @Param("userId") userId: string,
    @Param("postId") postId: string
  ) {
    return this.likeService.delete(parseInt(userId), parseInt(postId));
  }
}
