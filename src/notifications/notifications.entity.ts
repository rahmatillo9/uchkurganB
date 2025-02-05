import { Model, Column, Table, ForeignKey, BelongsTo, Default, AllowNull } from "sequelize-typescript";
import { User } from "src/users/user.entity";
import { Messages } from "src/messages/messages.entity";

@Table({
    tableName: "notifications",
    underscored: true,
    timestamps: true, // createdAt va updatedAt avtomatik qo'shiladi
})
export class Notification extends Model<Notification> {
    @ForeignKey(() => User)
    @Column
    userId: number; // Kimga bildirishnoma kelyapti

    @ForeignKey(() => Messages)
    @AllowNull(true) // Ba'zi bildirishnomalar xabarga bog‘liq bo‘lmasligi mumkin
    @Column
    messageId?: number; // Qaysi xabar uchun bildirishnoma (ixtiyoriy)

    @Column
    messageText: string; // Bildirishnoma matni (oldindan saqlab qo'yish uchun)

    @Default(false)
    @Column
    isRead: boolean; // O‘qilgan yoki yo‘qligini tekshirish uchun

    @BelongsTo(() => User, { foreignKey: "userId" })
    user: User;

    @BelongsTo(() => Messages, { foreignKey: "messageId" })
    message: Messages;
}
