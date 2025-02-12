import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Search } from "./search.entity";
import { SearchDto } from "src/validators/search.validator";

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Search)
    private readonly searchModel: typeof Search,
  ) {}

  async create(dto: SearchDto) {
    return this.searchModel.create({...dto} as Search)
  }

  async findAll(): Promise<Search[]> {
    return this.searchModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Search> {
    const search = await this.searchModel.findByPk(id, { include: { all: true } });
    if (!search) throw new NotFoundException("Search entry not found");
    return search;
  }

  async update(id: number, dto: SearchDto): Promise<Search> {
    const search = await this.findOne(id);
    await search.update(dto);
    return search;
  }

  async delete(id: number): Promise<void> {
    const search = await this.findOne(id);
    await search.destroy();
  }
}