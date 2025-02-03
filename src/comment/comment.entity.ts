import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Postt } from "src/post/post.entity";
import { User } from "src/users/user.entity";

@Table({
  tableName: "comment",
  timestamps: true, // createdAt va updatedAt avtomatik qo‘shiladi
})
export class Comment extends Model<Comment> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @ForeignKey(() => Postt)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  post_id!: number;

  @Column({
    type: DataType.TEXT, // STRING emas, TEXT qo‘shildi
    allowNull: false,
  })
  content!: string;

  @BelongsTo(() => User, { as: "user" })
  user!: User;

  @BelongsTo(() => Postt, { as: "post" })
  post!: Postt;
}
