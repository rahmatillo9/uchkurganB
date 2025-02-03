import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Postt } from "src/post/post.entity";
import { User } from "src/users/user.entity";

@Table({
  tableName: "likes", // Ko‘plik shaklda
  timestamps: true,
})
export class Like extends Model<Like> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number; // "user_id" emas, "userId"

  @ForeignKey(() => Postt)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId!: number; // "post_id" emas, "postId"

  @BelongsTo(() => User, { as: "user" })
  user!: User;

  @BelongsTo(() => Postt, { as: "post" })
  post!: Postt;
}
