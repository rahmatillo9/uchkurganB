import { Controller, Post, Get, Delete, Body, Param, UseGuards, Query } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostDto } from "src/validators/post.validator";
import { JwtAuthGuard } from "src/authguard/jwt-auth.guard";
import { RolesGuard } from "src/validators/RolesGuard/Roluse.guard";
import { Roles } from "src/validators/RolesGuard/Roles";
import { Role } from "src/validators/users.validator";



@Controller("posts")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Post()
    async createPost(@Body() dto: PostDto) {
        return await this.postService.createPost(dto);
    }

    // In your controller
@Get('/search')
async searchPosts(
    @Query('query') query: string,
    @Query('page') page: number = 1
) {
    return this.postService.searchPosts(query, page);
}

@Get('random')
async getRandomPosts(
    @Query('page') page: number = 1
) {
    return this.postService.getRandomPosts(page);
}
   
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
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
