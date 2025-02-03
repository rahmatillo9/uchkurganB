import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "src/validators/category.validator";


@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.categoryService.findOne(Number(id));
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(Number(id), dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.categoryService.delete(Number(id));
  }
}