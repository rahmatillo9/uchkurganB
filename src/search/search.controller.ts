import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchDto } from "src/validators/search.validator";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post("history")
  async create(@Body() searchDto: SearchDto) {
    return await this.searchService.create(searchDto);
  }

  @Get("history")
  async findAll() {
    return await this.searchService.findAll();
  }

  
  @Get("history/:userId")
  async getAllbyUserId(@Param("userId") userId: string) {
    return await this.searchService.findByUserId(parseInt(userId, 10));
  }

  @Get("history/:id")
  async findOne(@Param("id") id: string) {
    return await this.searchService.findOne(parseInt(id, 10));
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() searchDto: SearchDto) {
    return await this.searchService.update(parseInt(id, 10), searchDto);
  }

  @Delete("history/:id")
  async delete(@Param("id") id: string) {
    return await this.searchService.delete(parseInt(id, 10));
  }
}



