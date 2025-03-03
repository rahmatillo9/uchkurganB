import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from "sequelize-typescript";
import { Postt } from "src/post/post.entity";

@Table({
  tableName: "post_images",
  timestamps: true,
})
export class PostImage extends Model<PostImage> {
  @ForeignKey(() => Postt)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  post_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;

  @BelongsTo(() => Postt)
  post!: Postt;
}
