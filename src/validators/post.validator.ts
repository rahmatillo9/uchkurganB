import { IsString, IsInt, IsOptional, Min, MaxLength } from 'class-validator';

export class PostDto {
  @IsInt()
  user_id: number;

  @IsInt()
  category_id: number;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  contact_info?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional() // Bu qiymatlar kelmasa, null yoki undefined bo‘lishi mumkin
  @IsInt()
  @Min(0)
  views_count?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  likes_count?: number;
}
