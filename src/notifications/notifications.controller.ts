import { Controller, Post, Get, Patch, Body, Param } from "@nestjs/common";
import { NotificationService } from "./notifications.service";
import { CreateNotificationDto } from "src/validators/messegs/notification,validator";

@Controller("notifications")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    // **1. Bildirishnoma yaratish**
    @Post()
    async createNotification(@Body() dto: CreateNotificationDto) {
        return await this.notificationService.createNotification(dto);
    }

    // **2. Foydalanuvchi uchun barcha bildirishnomalarni olish**
    @Get(":user_id")
    async getNotifications(@Param("user_id") user_id: number) {
        return await this.notificationService.getNotifications(user_id);
    }

    // **3. Bildirishnomani o‘qilgan deb belgilash**
    @Patch(":id/read")
    async markAsRead(@Param("id") notificationId: number) {
        return await this.notificationService.markAsRead(notificationId);
    }
}
