import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException, UploadedFile, Req, UseInterceptors, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUserDto } from 'src/validators/users.validator';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { extname } from 'path';
import { unlink } from 'fs';
import sharp from 'sharp';
import { promises as fs } from 'fs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Throttle({ default: { limit: 20, ttl: 60 } })
  @Post()
  async create(@Body() createUserDto: CreateUsersDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Throttle({ default: { limit: 20, ttl: 60 } })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Throttle({ default: { limit: 20, ttl: 60 } })
  @Get('username/:nickname')
  async findByNickname(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findBynickname(username);
    if (!user) {
      throw new NotFoundException(`User with nickname ${username} not found`);
    }
    return user;
  }

  @Throttle({ default: { limit: 20, ttl: 60 } })
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('profile_image', {
      storage: diskStorage({
        destination: './uploads/profile_image',
        filename: async (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname).toLowerCase();
          let fileName = `${uniqueSuffix}${ext}`;
  
          // HEIC yoki HEIF formatlarini avtomatik WEBP ga aylantirish
          if (ext === '.heic' || ext === '.heif') {
            fileName = `${uniqueSuffix}.webp`; // Yangi nom
            const outputPath = `./uploads/postImage/${fileName}`;
  
            // Faylni vaqtincha saqlash va WebP ga o'zgartirish
            await sharp(file.path)
              .toFormat('webp')
              .toFile(outputPath);
  
            // Asl faylni o‘chirish
            await fs.unlink(file.path);
          }
  
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|heic|heif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
async updateProfile(
  @Param('id') id: number, // User ID
  @UploadedFile() file: Express.Multer.File, // Yuklangan fayl
  @Body() updateProfileDto: UpdateUserDto, // Yangilangan ma'lumotlar
) {
  try {
    // Eski rasmni tekshirish va o‘chirish
    const user = await this.usersService.findOne(id); // Foydalanuvchi ma'lumotlarini olish
    if (user.profile_image) {
      const oldImagePath = `.${user.profile_image}`; // Eski rasmni olish
      unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Eski rasmni o‘chirishda xatolik:', err);
        } else {
          console.log('Eski rasm muvaffaqiyatli o‘chirildi');
        }
      });
    }

    // Fayl muvaffaqiyatli yuklangan bo'lsa, fayl nomini olish
    const profile_image = file ? `/uploads/profile_image/${file.filename}` : undefined;
    console.log("file Name", file.filename);

    // Yangilangan ma'lumotlar
    const updatedData = {
      ...updateProfileDto,
      ...(profile_image && { profile_image }), // Agar fayl bor bo'lsa, uni qo'shish
    };

    // Foydalanuvchi profilini yangilash
    const updatedProfile = await this.usersService.update(id, updatedData);

    // Muvaffaqiyatli yangilashni qaytarish
    return {
      message: 'Profile updated successfully',
      updatedProfile,
    };
  } catch (error) {
    // Xatolik yuzaga kelganda xabar qaytarish
    return {
      message: 'Error updating profile',
      error: error.message,
    };
  }
}
  

  // Delete a user by ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersService.deleteUser(id);
  }
}
