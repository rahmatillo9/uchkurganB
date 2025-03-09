import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export enum Role {
  Customer = 'customer',
  Admin = 'admin',
}

export class CreateUsersDto {
  @IsString({ message: "Foydalanuvchi nomi matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Foydalanuvchi nomi bo‘sh bo‘lishi mumkin emas" })
  username: string;

  @IsString({ message: "Email matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Email bo‘sh bo‘lishi mumkin emas" })
  @IsEmail({}, { message: "Email noto‘g‘ri formatda kiritilgan" })
  email: string;

  @IsEnum(Role, { message: "Rol noto‘g‘ri qiymatda kiritilgan (customer yoki admin bo‘lishi kerak)" })
  @IsNotEmpty({ message: "Rol bo‘sh bo‘lishi mumkin emas" })
  role: Role;

  @IsString({ message: "Parol matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Parol bo‘sh bo‘lishi mumkin emas" })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" })
  password: string;

  @IsOptional()
  @IsString({ message: "Profil rasmi faqat matn bo‘lishi mumkin" })
  profile_image?: string;

  @IsOptional()
  @IsString({ message: "Bio faqat matn bo‘lishi mumkin" })
  bio?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "Foydalanuvchi nomi matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Foydalanuvchi nomi bo‘sh bo‘lishi mumkin emas" })
  username?: string;

  @IsOptional()
  @IsString({ message: "Email matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Email bo‘sh bo‘lishi mumkin emas" })
  @IsEmail({}, { message: "Email noto‘g‘ri formatda kiritilgan" })
  email?: string;

  @IsOptional()
  @IsEnum(Role, { message: "Rol noto‘g‘ri qiymatda kiritilgan (customer yoki admin bo‘lishi kerak)" })
  role?: Role;

  @IsOptional()
  @IsString({ message: "Parol matn bo‘lishi kerak" })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" })
  password?: string;

  @IsOptional()
  @IsString({ message: "Profil rasmi faqat matn bo‘lishi mumkin" })
  profile_image?: string;

  @IsOptional()
  @IsString({ message: "Bio faqat matn bo‘lishi mumkin" })
  bio?: string;
}
