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
            userId: dto.userId, // Kimga yuborilayotgani
            messageId: dto.messageId,
            messageText: dto.messageText,
            isRead: false, // Yangi bildirishnoma doim o‘qilmagan bo‘ladi
        };

        return await this.notificationModel.create(notificationData as any);
    }

    // **2. Foydalanuvchi uchun barcha bildirishnomalarni olish**
    async getNotifications(userId: number) {
        return await this.notificationModel.findAll({ where: { userId } });
    }

    // **3. Bildirishnomani o‘qilgan deb belgilash**
    async markAsRead(notificationId: number) {
        const notification = await this.notificationModel.findByPk(notificationId);
        if (!notification) {
            return { message: "Bildirishnoma topilmadi" };
        }

        notification.isRead = true;
        await notification.save();
        return { message: "Bildirishnoma o‘qildi" };
    }
}
