import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class SearchDto {
  @IsInt()
  @IsNotEmpty()
  user_id!: number; // Foydalanuvchi ID si majburiy va butun son bo‘lishi kerak
 
  @IsString()
  @IsNotEmpty()
  search_query!: string; // Foydalanuvchi ID si majburiy va butun son bo‘lishi kerak

}
