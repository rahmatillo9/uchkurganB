import { Model, Column, Table, ForeignKey, BelongsTo, Default, AllowNull } from "sequelize-typescript";
import { User } from "src/users/user.entity";
import { Postt } from "src/post/post.entity";

@Table({
    tableName: "notifications",
    underscored: true,
    timestamps: true, // createdAt va updatedAt avtomatik qo'shiladi
})
export class Notification extends Model<Notification> {
    @ForeignKey(() => User)
    @Column
    user_id: number; // Kimga bildirishnoma kelgan

    @ForeignKey(() => User)
    @Column
    from_user_id: number; // Kim yuborgan

    @AllowNull(false)
    @Column
    type: string; // Bildirishnoma turi (like, comment, follow)

    @ForeignKey(() => Postt)
    @Column
    post_id?: number; // Agar postga bog‘liq bo‘lsa

    @Default(false)
    @Column
    is_read: boolean; // O‘qilgan yoki yo‘qligini tekshirish uchun

    @BelongsTo(() => User, { foreignKey: "user_id" })
    user: User;

    @BelongsTo(() => User, { foreignKey: "from_user_id" })
    fromUser: User;

    @BelongsTo(() => Postt, { foreignKey: "post_id" })
    post?: Postt;
}