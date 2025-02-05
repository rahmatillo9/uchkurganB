import { Model, Column, Table, ForeignKey, BelongsTo, Default } from "sequelize-typescript";
import { User } from "src/users/user.entity";

@Table({
    tableName: "messages",
    underscored: true,
    timestamps: true, // createdAt va updatedAt ni avtomatik qo'shadi
})
export class Messages extends Model<Messages> {
    @Column
    message: string;

    @ForeignKey(() => User)
    @Column
    senderId: number;

    @ForeignKey(() => User)
    @Column
    receiverId: number;

    @Default(false)
    @Column
    isRead: boolean; // Xabar o‘qilgan yoki yo‘qligini saqlaydi

    @BelongsTo(() => User, { foreignKey: "senderId" })
    sender: User;

    @BelongsTo(() => User, { foreignKey: "receiverId" })
    receiver: User;
}
