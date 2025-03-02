import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Blocked } from "src/blocked/blocked.entity";
import { Comment } from "src/comment/comment.entity";
import { Like } from "src/like/like.entity";
import { Notification } from "src/notifications/notifications.entity";
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
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email !: string;

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
  password !: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_image?: string; // "undefined" bo‘lishi mumkinligi uchun "?" qo‘shildi

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bio!: string;

  @HasMany(() => Postt)
  posts!: Postt[]; // "Post" emas, "posts"

  @HasMany(() => Comment)
  comments!: Comment[];

  @HasMany(() => Like)
  likes!: Like[];

  @HasMany(() => Search)
  searches!: Search[];


  @HasMany(() => Notification)
  notifications!: Notification[];

  @HasMany(() => Blocked)
  blocked!: Blocked[];
}
