import { IsString, IsInt, IsOptional, Min, MaxLength } from 'class-validator';

export class PostDto {
  @IsInt()
  user_id: number;

  @IsString()
  caption : string;


  @IsOptional() 
  @IsInt()
  @Min(0)
  views_count?: number;


}
