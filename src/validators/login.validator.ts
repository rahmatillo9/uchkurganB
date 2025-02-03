import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto{
    @IsEmail()
    @IsNotEmpty()
    nickname: string;

    @IsString()
    @IsNotEmpty()
    password: string
}