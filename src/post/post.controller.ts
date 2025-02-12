import { Controller, Get, Post, Body,  Param, Delete, UseInterceptors, Put, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from 'src/validators/post.validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'fs';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/postImage', // Fayllar saqlanadigan joy
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Faylning kengaytmasini olish
          const fileName = `${uniqueSuffix}${ext}`; // Yangi fayl nomi
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          // Faqat rasm fayllarini ruxsat berish
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      

      },
    })
  )
  async create(@Body() createPostDto: PostDto, @UploadedFile() file: Express.Multer.File) {
    try {
      // Fayl muvaffaqiyatli yuklangan bo'lsa, fayl nomini olish
      const image = file ? `/uploads/postImage/${file.filename}` : undefined;
  
      // Yangilangan ma'lumotlar
      const postData = {
        ...createPostDto,
        ...(image && { image }), // Agar fayl bor bo'lsa, uni qo'shish
      };
  
      // Postni yaratish
      const newPost = await this.postService.create(postData);
  
      return {
        message: 'Post created successfully',
        newPost,
      };
    } catch (error) {
      return {
        message: 'Error creating post',
        error: error.message,
      };
    }
  }
  

  @Get('user/:id')
  async findByUserId(@Param('id') id: string) {
    return await this.postService.findByUserId(parseInt(id, 10));
  }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(parseInt(id, 10));
  }

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
  async updateProfile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() postDto: PostDto,
  ) {
    try {
      // Eski rasmni olish
      const post = await this.postService.findOne(id);
      
      // Eski rasmni o‘chirish (agar mavjud bo‘lsa)
      if (post.image && file) {
        const oldImagePath = `./uploads/postImage/${post.image.split('/').pop()}`;
        unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Eski rasmni o‘chirishda xatolik:', err);
          } else {
            console.log('Eski rasm muvaffaqiyatli o‘chirildi');
          }
        });
      }
  
      // Yangi rasm fayl yo‘lini olish
      const profile_image = file ? `/uploads/postImage/${file.filename}` : post.image;
      console.log('Uploaded file:', file?.filename);
  
      // Yangilangan ma'lumotlar
      const updatedData = {
        ...postDto,
        image: profile_image, // Rasim yo‘lini to‘g‘ri joylaymiz
      };
  
      // Yangilash
      const updatedProfile = await this.postService.update(id, updatedData);
  
      return {
        message: 'Profile updated successfully',
        updatedProfile,
      };
    } catch (error) {
      return {
        message: 'Error updating profile',
        error: error.message,
      };
    }
  }
  

@Delete(':id')
async delete(@Param('id') id: string) {
  try {
    // O‘chiriladigan postni topish
    const post = await this.postService.findOne(parseInt(id, 10));

    // Agar postda rasm bo‘lsa, uni o‘chirish
    if (post.image) {
      const imagePath = `.${post.image}`; // Fayl manzili
      unlink(imagePath, (err) => {
        if (err) {
          console.error('Rasmni o‘chirishda xatolik:', err);
        } else {
          console.log('Rasm muvaffaqiyatli o‘chirildi');
        }
      });
    }

    // Postni o‘chirish
    await this.postService.delete(parseInt(id, 10));

    // Muvaffaqiyatli o‘chirish xabarini qaytarish
    return { message: 'Post and image deleted successfully' };
  } catch (error) {
    // Xatolik yuzaga kelganda xabar qaytarish
    return {
      message: 'Error deleting post',
      error: error.message,
    };
  }
}
}
