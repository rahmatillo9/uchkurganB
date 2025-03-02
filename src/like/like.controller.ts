
import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeDto } from "src/validators/like.validator";

@Controller("likes")
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    // **1. Like qo‘shish yoki olib tashlash**
    @Post()
    async toggleLike(@Body() dto: LikeDto) {
        return await this.likeService.addLike(dto);
    }

    // **2. Postdagi like-lar sonini olish**
    @Get("post/:postId")
    async getPostLikes(@Param("postId") postId: number) {
        return await this.likeService.getPostLikes(postId);
    }

    // **3. Foydalanuvchining postga like bosgan-bosmaganini tekshirish**
    @Get("user/:userId/post/:postId")
    async hasUserLikedPost(@Param("userId") userId: number, @Param("postId") postId: number) {
        return await this.likeService.hasUserLikedPost(userId, postId);
    }
}
