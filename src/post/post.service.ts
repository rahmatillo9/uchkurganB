import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Postt } from "./post.entity";
import { PostDto } from "src/validators/post.validator";
import { promisify } from "util";
import { User } from "src/users/user.entity";
import { PostImage } from "src/postImage/postImage.entity";
import { Like } from "src/like/like.entity"; // Like modelini import qilish
import { Comment } from "src/comment/comment.entity"; // Comment modelini import qilish
import { unlink } from "fs";


const unlinkAsync = promisify(unlink);

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Postt) private readonly postModel: typeof Postt,
        @InjectModel(Like) private readonly likeModel: typeof Like, // Like modelini injektsiya qilish
        @InjectModel(Comment) private readonly commentModel: typeof Comment, // Comment modelini injektsiya qilish
        @InjectModel(PostImage) private readonly postImageModel: typeof PostImage // PostImage modelini injektsiya qilish
    ) {}

    async createPost(dto: PostDto) {
        return await this.postModel.create({ ...dto } as Postt);
    }

    async getAllPosts() {
        return await this.postModel.findAll({ include: ["user", "comments", "likes", "images"] });
    }

    async getUserPosts(user_id: number) {
        return await this.postModel.findAll({ where: { user_id }, include: ["comments", "likes", "images"] });
    }

    async findOne(postId: number): Promise<Postt> {
        const post = await this.postModel.findByPk(postId, {
            include: ["user", "comments", "likes", "images"],
        });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        await post.increment('views_count', { by: 1 });
        return post;
    }

    async getPostById(post_id: number) {
        return await this.postModel.findByPk(post_id, { include: ["user", "comments", "likes", "images"] });
    }

    async deletePost(postId: number) {
        if (!this.postModel.sequelize) {
            throw new Error('Sequelize instance is not available');
        }
        try {
            return await this.postModel.sequelize.transaction(async (t) => {
    const post = await this.findOne(postId);

    if (!post) {
        throw new Error(`Post with id ${postId} not found`);
    }

    // Likes
    const deletedLikes = await this.likeModel.destroy({ where: { postId }, transaction: t });
    console.log(`Deleted Likes: ${deletedLikes}`);

    // Comments
    const deletedComments = await this.commentModel.destroy({ where: { post_id: postId }, transaction: t });
    console.log(`Deleted Comments: ${deletedComments}`);

    // Images
    await this.deletePostImages(post, t);

    // Postni o‘chirish
    const deletedPost = await this.postModel.destroy({ where: { id: postId }, transaction: t });
    if (deletedPost === 0) {
        throw new Error(`Post with id ${postId} could not be deleted`);
    }

    return { message: 'Post va unga bog‘liq ma’lumotlar o‘chirildi' };
});
        } catch (error) {
            console.error('Delete post error:', error);
            throw new Error(`Error deleting post: ${error.message}`);
        }
    }

    private async deletePostImages(post: Postt, transaction?: any) {
        if (post.images && post.images.length > 0) {
            for (const img of post.images) {
                const imagePath = `.${img.image}`;
                try {
                    await unlinkAsync(imagePath);
                    console.log(`${img.image} muvaffaqiyatli o‘chirildi`);
                } catch (err) {
                    console.error('Rasmni o‘chirishda xatolik:', err);
                }
            }
            await this.postImageModel.destroy({ where: { post_id: post.id }, transaction });
        }
    }
}