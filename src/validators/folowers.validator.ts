import { IsInt } from 'class-validator';

export class FollowDto {
  @IsInt()
  follower_id: number;

  @IsInt()
  following_id: number;
}
