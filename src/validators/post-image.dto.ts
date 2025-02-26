import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePostImageDto {
  @IsInt()
  @IsNotEmpty()
  post_id: number;

  @IsString()
  @IsNotEmpty()
  image: string;
}
