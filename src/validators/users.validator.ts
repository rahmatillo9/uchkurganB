import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export enum Role {
  Customer = 'customer',
  Admin = 'admin',
}

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role; // Enum turini belgilash

  @IsEmail()
  email: string;

  @IsString()
  profile_image: string;

  
  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullname?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // Enum turini belgilash

  @IsOptional()
  @IsEmail()
  email?: string;



  @IsOptional()
  @IsString()
  profile_image?: string

  @IsOptional()
  @IsString()
  @MinLength(6) // Minimal uzunlik
  password?: string;

}
