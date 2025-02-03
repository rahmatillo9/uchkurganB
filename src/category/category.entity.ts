import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Postt } from "src/post/post.entity";

@Table({
  tableName: "category",
  timestamps: true, // createdAt va updatedAt ustunlarini avtomatik qo'shadi
})
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Har bir kategoriya nomi takrorlanmasligi uchun
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string; // Kategoriya haqida qo‘shimcha ma’lumot (ixtiyoriy)

  @HasMany(() => Postt)
  posts!: Postt[];
}
