import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateMessageDto {
    @IsNumber()
    senderId: number;

    @IsNumber()
    receiverId: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1, { message: "Xabar bo‘sh bo‘lishi mumkin emas!" })
    message: string;
}
