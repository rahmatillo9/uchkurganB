import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UseInterceptors, 
  UploadedFile, 
  UseGuards
} from "@nestjs/common";
import { PostImageService } from "./post-image.service";
import { CreatePostImageDto } from "src/validators/post-image.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { existsSync, unlink } from "fs";
import { JwtAuthGuard } from "src/authguard/jwt-auth.guard";
import { RolesGuard } from "src/validators/RolesGuard/Roluse.guard";
import { Role } from "src/validators/users.validator";
import { Roles } from "src/validators/RolesGuard/Roles";



@Controller("post-images")
export class PostImageController {
  constructor(private readonly postImageService: PostImageService) {}


  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Customer)
  @Post()
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/postImage',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const fileName = `${uniqueSuffix}${ext}`;
        callback(null, fileName);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    },
  }),
)
async createImage(
  @UploadedFile() file: Express.Multer.File,
  @Body() postImageDto: CreatePostImageDto,
) {
  try {
    if (!file) {
      return { message: 'Image file is required' };
    }

    const imagePath = `/uploads/postImage/${file.filename}`;
    const newPostImage = await this.postImageService.create({
      ...postImageDto,
      image: imagePath,
    });

    return {
      message: 'Post image created successfully',
      newPostImage,
    };
  } catch (error) {
    return {
      message: 'Error creating post image',
      error: error.message,
    };
  }
}

@Get()
async findAll() {
  try {
    const images = await this.postImageService.findAll();
    return {
      message: 'All post images retrieved successfully',
      images,
    };
  } catch (error) {
    return {
      message: 'Error retrieving post images',
      error: error.message,
    };
  }
}



@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Customer)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/postImage',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `${uniqueSuffix}${ext}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async updateImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() postImageDto: CreatePostImageDto,
  ) {
    try {
      const postImage = await this.postImageService.findOne(id);
  
      if (!postImage) {
        return { message: 'Post image not found' };
      }
  
      // Eski rasmni o‘chirish (agar mavjud bo‘lsa)
      if (postImage.image && file) {
        const oldImagePath = `.${postImage.image}`;
        if (existsSync(oldImagePath)) {
          unlink(oldImagePath, (err) => {
            if (err) console.error('Eski rasmni o‘chirishda xatolik:', err);
            else console.log('Eski rasm muvaffaqiyatli o‘chirildi');
          });
        }
      }
  
      // Yangi rasm yo‘lini olish
      const updatedImage = file ? `/uploads/postImage/${file.filename}` : postImage.image;
  
      // Yangilangan post image ni saqlash
      const updatedPostImage = await this.postImageService.update(id, { ...postImageDto, image: updatedImage });
  
      return {
        message: 'Post image updated successfully',
        updatedPostImage,
      };
    } catch (error) {
      return {
        message: 'Error updating post image',
        error: error.message,
      };
    }
  }
  

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Customer)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const postImage = await this.postImageService.findOne(parseInt(id, 10));
  
      if (!postImage) {
        return { message: 'Post image not found' };
      }
  
      // Rasmni o‘chirish (agar mavjud bo‘lsa)
      if (postImage.image) {
        const imagePath = `.${postImage.image}`;
        if (existsSync(imagePath)) {
          unlink(imagePath, (err) => {
            if (err) console.error('Rasmni o‘chirishda xatolik:', err);
            else console.log('Rasm muvaffaqiyatli o‘chirildi');
          });
        }
      }
  
      // PostImage ni o‘chirish
      await this.postImageService.delete(parseInt(id, 10));
  
      return { message: 'Post image deleted successfully' };
    } catch (error) {
      return {
        message: 'Error deleting post image',
        error: error.message,
      };
    }
  }
}
