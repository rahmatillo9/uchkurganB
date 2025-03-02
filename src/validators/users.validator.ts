import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export enum Role {
  Customer = 'customer',
  Admin = 'admin',
}

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email : string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role; // Enum turini belgilash

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password : string;

  @IsString()
  
  profile_image: string;

  
  @IsString()
  bio : string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // Enum turini belgilash

  @IsOptional()
  @IsEmail()
  password?: string;



  @IsOptional()
  @IsString()
  profile_image?: string

  @IsOptional()
  @IsString()
  bio ?: string;

}
