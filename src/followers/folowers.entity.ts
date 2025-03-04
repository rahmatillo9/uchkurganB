
import { Table, Model, ForeignKey, Column, DataType, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/user.entity";

@Table({
    tableName: "followers",
    timestamps: true,
})
export class Follower extends Model<Follower> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    follower_id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    following_id!: number;

    @BelongsTo(() => User, { as: "follower" })
    follower!: User;

    @BelongsTo(() => User, { as: "following" })
    following!: User;



}