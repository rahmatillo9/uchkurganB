import { IsInt } from 'class-validator';

export class SavePostDto {
  @IsInt()
  user_id: number;

  @IsInt()
  post_id: number;
}
