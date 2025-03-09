import { IsString, IsInt, IsOptional, Min, MaxLength } from 'class-validator';

export class PostDto {
  @IsInt()
  user_id: number;

  @IsString()
  @MaxLength(255, { message: "Ma`lumot 255 ta belgidan ko`q bo`lmasligi kerak" })
  caption : string;


  @IsOptional() 
  @IsInt()
  @Min(0)
  views_count?: number;


}
