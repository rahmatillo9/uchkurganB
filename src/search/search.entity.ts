import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.entity";

@Table({
  tableName: "search",
  timestamps: true, // createdAt va updatedAt avtomatik qo‘shiladi
})
export class Search extends Model<Search> {
  @Column({
    type: DataType.TEXT, // TEXT ishlatilgan, STRING emas
    allowNull: false,
  })
  search_query!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @BelongsTo(() => User, { as: "user" })
  user!: User;
}
