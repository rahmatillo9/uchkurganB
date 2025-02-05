import { Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/user.entity";

@Table({
    tableName: "blocked_users",
    underscored: true,
    timestamps: true, // createdAt va updatedAt avtomatik qo'shiladi
})
export class Blocked extends Model<Blocked> {
    @ForeignKey(() => User)
    @Column
    blockerId: number; // Kim blokladi

    @ForeignKey(() => User)
    @Column
    blockedId: number; // Kim bloklandi

    @BelongsTo(() => User, { foreignKey: "blockerId" })
    blocker: User;

    @BelongsTo(() => User, { foreignKey: "blockedId" })
    blocked: User;


}
