import { IsBoolean, IsNumber, IsString } from "class-validator";


export class CreateNotificationDto {
   @IsNumber()
   userId: number;

    @IsNumber()
    messageId: number;

    @IsString()
    messageText: number;

    @IsBoolean()
    isRead: boolean;
}
