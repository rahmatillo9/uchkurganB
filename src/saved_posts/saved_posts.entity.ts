
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Postt } from "src/post/post.entity";
import { User } from "src/users/user.entity";

@Table({
    tableName: "saved_posts",
    timestamps: true,
})
export class SavedPost extends Model<SavedPost> {
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

    @BelongsTo(() => User, { as: "user" })
    user!: User;

    @BelongsTo(() => Postt, { as: "post" })
    post!: Postt;

}