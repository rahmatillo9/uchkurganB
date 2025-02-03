import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "src/comment/comment.entity";
import { Like } from "src/like/like.entity";
import { Postt } from "src/post/post.entity";
import { Search } from "src/search/search.entity";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nickname!: string;

  @Column({
    type: DataType.ENUM( 'customer', 'admin'),
    allowNull: false,
    defaultValue: 'customer',
  })
  role!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_image?: string; // "undefined" bo‘lishi mumkinligi uchun "?" qo‘shildi

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Postt)
  posts!: Postt[]; // "Post" emas, "posts"

  @HasMany(() => Comment)
  comments!: Comment[];

  @HasMany(() => Like)
  likes!: Like[];

  @HasMany(() => Search)
  searches!: Search[];
}
