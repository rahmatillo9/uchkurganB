import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchDto } from "src/validators/search.validator";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  async create(@Body() searchDto: SearchDto) {
    return await this.searchService.create(searchDto);
  }

  @Get()
  async findAll() {
    return await this.searchService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.searchService.findOne(parseInt(id, 10));
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() searchDto: SearchDto) {
    return await this.searchService.update(parseInt(id, 10), searchDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.searchService.delete(parseInt(id, 10));
  }
}



