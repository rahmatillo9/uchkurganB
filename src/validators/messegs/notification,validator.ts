import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsNumber()
    user_id: number;

    @IsNumber()
    from_user_id: number;

    @IsString()
    type: string;

    @IsNumber()
    post_id?: number;

    @IsBoolean()
    is_read: boolean;
}