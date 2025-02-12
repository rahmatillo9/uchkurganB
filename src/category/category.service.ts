import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./category.entity";
import { CategoryDto } from "src/validators/category.validator";
import { Postt } from "src/post/post.entity";


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async create(dto: CategoryDto){
    return this.categoryModel.create({...dto} as Category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll({
       include: [
        {
          model: Postt,
          as: 'posts',
          attributes: ['user_id', 'category_id', 'title', 'content', 'contact_info', 'image', 'views_count', 'likes_count',  ]
        }

    ] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id, { 
      include: [
        {
          model: Postt,
          as: 'posts',
          attributes: ['user_id', 'category_id', 'title', 'content', 'contact_info', 'image', 'views_count', 'likes_count',  ]
        }

    ]
     });
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