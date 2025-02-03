import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50) // Kategoriya nomi 3 dan 50 ta belgigacha bo‘lishi kerak
  name!: string;

  @IsString()
  @IsOptional() // Ixtiyoriy maydon
  @Length(5, 255) // Tavsif kamida 5 ta belgi bo‘lishi kerak
  description?: string;
}
