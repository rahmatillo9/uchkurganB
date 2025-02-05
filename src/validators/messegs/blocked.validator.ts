import {  IsNumber } from "class-validator";

export class BlockUserDto {
    @IsNumber()
    blockerId: number;

    @IsNumber()
    blockedId: number;
}
