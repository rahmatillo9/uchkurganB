import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Postt } from "src/post/post.entity";
import { User } from "src/users/user.entity";

@Table({
  tableName: "likes", 
  timestamps: true,
})
export class Like extends Model<Like> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Postt)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false, 
    allowNull: true,
  })
  isLiked!: boolean;

  @BelongsTo(() => User, { as: "user" })
  user!: User;

  @BelongsTo(() => Postt, { as: "post" })
  post!: Postt;
}
