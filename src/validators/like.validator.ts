import { IsInt, IsNotEmpty } from "class-validator";

export class LikeDto {
  @IsInt()
  @IsNotEmpty()
  userId!: number; // Foydalanuvchi ID si majburiy va butun son bo‘lishi kerak

  @IsInt()
  @IsNotEmpty()
  postId!: number; // Post ID si majburiy va butun son bo‘lishi kerak
}
