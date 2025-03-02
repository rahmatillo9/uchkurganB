import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto{
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string
}