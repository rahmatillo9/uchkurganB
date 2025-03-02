import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "src/comment/comment.entity";
import { Like } from "src/like/like.entity";
import { User } from "src/users/user.entity";
import { PostImage } from "src/postImage/postImage.entity";

@Table({
  tableName: "post",
  timestamps: true,
})
export class Postt extends Model<Postt> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;



  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  caption!: string;




  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  views_count!: number;

  
  @BelongsTo(() => User, { as: "user" })
  user!: User;

  @HasMany(() => Comment, { onDelete: 'CASCADE' })
  comments!: Comment[];

  @HasMany(() => Like, { onDelete: 'CASCADE' })
  likes!: Like[];

  @HasMany(() => PostImage, { onDelete: 'CASCADE' })
images!: PostImage[];
}


