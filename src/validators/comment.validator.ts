import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CommentDto {
  @IsInt()
  @IsNotEmpty()
  user_id!: number; // Foydalanuvchi ID si majburiy va butun son bo‘lishi kerak

  @IsInt()
  @IsNotEmpty()
  post_id!: number; // Post ID si majburiy va butun son bo‘lishi kerak

  @IsString()
  @IsNotEmpty()
  @Length(1, 500) // Komment uzunligi 1 dan 500 gacha bo‘lishi kerak
  content!: string;
}