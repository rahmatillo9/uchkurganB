import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PostImage } from "./postImage.entity";
import { CreatePostImageDto } from "src/validators/post-image.dto";
import { existsSync, unlink } from "fs";

@Injectable()
export class PostImageService {
  constructor(
    @InjectModel(PostImage)
    private postImageModel: typeof PostImage
  ) {}

  async create(dto: CreatePostImageDto): Promise<PostImage> {
    return this.postImageModel.create({ ...dto } as PostImage);
  }

  async findAll(): Promise<PostImage[]> {
    return this.postImageModel.findAll();
  }

  async findOne(id: number): Promise<PostImage | null> {
    return this.postImageModel.findByPk(id);
  }

  async findByPostId(post_id: number): Promise<PostImage[]> {
    return this.postImageModel.findAll({ where: { post_id } });
  }

  async update(id: number, dto: Partial<CreatePostImageDto>): Promise<PostImage> {
    const postImage = await this.findOne(id);
    if (!postImage) {
      throw new NotFoundException("Post image not found");
    }
    await postImage.update(dto);
    return postImage;
  }

  async delete(id: number): Promise<void> {
    const postImage = await this.findOne(id);
    if (!postImage) {
      throw new NotFoundException("Image not found");
    }

    // Rasmni o‘chirish
    if (postImage.image) {
      const imagePath = `.${postImage.image}`;
      if (existsSync(imagePath)) {
        unlink(imagePath, (err) => {
          if (err) console.error("Rasmni o‘chirishda xatolik:", err);
          else console.log("Rasm muvaffaqiyatli o‘chirildi");
        });
      }
    }

    await postImage.destroy();
  }
}
