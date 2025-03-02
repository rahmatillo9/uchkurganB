import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Notification } from "./notifications.entity";
import { CreateNotificationDto } from "src/validators/messegs/notification,validator";

@Injectable()
export class NotificationService {
    constructor(@InjectModel(Notification) private readonly notificationModel: typeof Notification) {}

    // **1. Bildirishnoma yaratish**
    async createNotification(dto: CreateNotificationDto) {
        const notificationData = {
            user_id: dto.user_id, // Kimga yuborilayotgani
            from_user_id: dto.from_user_id, // Kim yuborgan
            type: dto.type, // Bildirishnoma turi
            post_id: dto.post_id || null, // Postga bog‘liq bo‘lsa
            is_read: false, // Yangi bildirishnoma doim o‘qilmagan bo‘ladi
        };

        return await this.notificationModel.create(notificationData as any);
    }

    // **2. Foydalanuvchi uchun barcha bildirishnomalarni olish**
    async getNotifications(user_id: number) {
        return await this.notificationModel.findAll({ where: { user_id } });
    }

    // **3. Bildirishnomani o‘qilgan deb belgilash**
    async markAsRead(notificationId: number) {
        const notification = await this.notificationModel.findByPk(notificationId);
        if (!notification) {
            return { message: "Bildirishnoma topilmadi" };
        }

        notification.is_read = true;
        await notification.save();
        return { message: "Bildirishnoma o‘qildi" };
    }
}
