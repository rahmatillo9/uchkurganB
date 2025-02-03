import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./category.entity";
import { CategoryDto } from "src/validators/category.validator";


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async create(dto: CategoryDto){
    const categoryData = {
      name: dto.name,
      description: dto.description,

    };
    return this.categoryModel.create(categoryData as any);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id, { include: { all: true } });
    if (!category) throw new NotFoundException("Category not found");
    return category;
  }

  async update(id: number, dto: CategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    await category.update(dto);
    return category;
  }

  async delete(id: number): Promise<void> {
    const category = await this.findOne(id);
    await category.destroy();
  }
}