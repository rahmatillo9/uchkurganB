import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostDto } from "src/validators/post.validator";

@Controller("posts")
export class PostController {
    constructor(private readonly postService: PostService) {}

    // **1. Post yaratish**
    @Post()
    async createPost(@Body() dto: PostDto) {
        return await this.postService.createPost(dto);
    }

    // **2. Barcha postlarni olish**
    @Get()
    async getAllPosts() {
        return await this.postService.getAllPosts();
    }

    // **3. Foydalanuvchining postlarini olish**
    @Get("user/:user_id")
    async getUserPosts(@Param("user_id") user_id: number) {
        return await this.postService.getUserPosts(user_id);
    }

    // **4. Bitta postni olish**
    @Get(":post_id")
    async getPostById(@Param("post_id") post_id: number) {
        return await this.postService.getPostById(post_id);
    }

    // **5. Postni o‘chirish**
    @Delete(':id')
    async delete(@Param('id') id: string) {
      try {
        const result = await this.postService.deletePost(parseInt(id, 10));
        return result;
      } catch (error) {
        return {
          message: 'Error deleting post',
          error: error.message,
        };
      }
    }
}
