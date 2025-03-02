import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Postt } from "./post.entity";
import { PostDto } from "src/validators/post.validator";
import { unlink } from "fs";
import { User } from "src/users/user.entity";
import { PostImage } from "src/postImage/postImage.entity";

@Injectable()
export class PostService {
    constructor(@InjectModel(Postt) private readonly postModel: typeof Postt) {}

    // **1. Post yaratish**
    async createPost(dto: PostDto) {
        return await this.postModel.create({...dto} as Postt);
    }

    // **2. Barcha postlarni olish**
    async getAllPosts() {
        return await this.postModel.findAll({ include: ["user", "comments", "likes", "images"] });
    }

    // **3. Foydalanuvchining postlarini olish**
    async getUserPosts(user_id: number) {
        return await this.postModel.findAll({ where: { user_id }, include: ["comments", "likes", "images"] });
    }

    async findOne(postId: number): Promise<Postt> {
        const post = await this.postModel.findByPk(postId, {
            include: ["user", "comments", "likes", "images"]
        });
        if (!post) {
          throw new NotFoundException('Post not found');
        }
        await post.increment('views_count', { by: 1 });
        return post;
      }

    // **4. Bitta postni olish**
    async getPostById(post_id: number) {
        return await this.postModel.findByPk(post_id, { include: ["user", "comments", "likes", "images"] });
    }

    // **5. Postni o‘chirish**
    async deletePost(postId: number) {
        const post = await this.findOne(postId);
        if (!post) {
          return { message: 'Post topilmadi' };
        }
      
        await this.deletePostImages(post);
      
        await this.postModel.destroy({ where: { id: postId } });
      
        return { message: 'Post va unga bog‘liq ma’lumotlar o‘chirildi' };
      }
      
      private async deletePostImages(post: Postt) {
        if (post.images && post.images.length > 0) {
          for (const img of post.images) {
            const imagePath = `.${img.image}`;
            await unlink(imagePath, (err) => {
              if (err) {
                console.error('Rasmni o‘chirishda xatolik:', err);
              } else {
                console.log(`${img.image} muvaffaqiyatli o‘chirildi`);
              }
            });
          }
        }
}
}
