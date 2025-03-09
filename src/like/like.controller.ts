
import { Controller, Post, Get, Body, Param, UseGuards } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeDto } from "src/validators/like.validator";


import { JwtAuthGuard } from "src/authguard/jwt-auth.guard";
import { Role } from "src/validators/users.validator";
import { RolesGuard } from "src/validators/RolesGuard/Roluse.guard";
import { Roles } from "src/validators/RolesGuard/Roles";



@Controller("likes")
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Post()
    async toggleLike(@Body() dto: LikeDto) {
        return await this.likeService.addLike(dto);
    }

    // **2. Postdagi like-lar sonini olish**
    @Get("post/:postId")
    async getPostLikes(@Param("postId") postId: number) {
        return await this.likeService.getPostLikes(postId);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.Admin, Role.Customer)
    @Get("user/:userId/post/:postId")
    async hasUserLikedPost(@Param("userId") userId: number, @Param("postId") postId: number) {
        return await this.likeService.hasUserLikedPost(userId, postId);
    }
}
