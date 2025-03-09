import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notifications.service";
import { CreateNotificationDto } from "src/validators/messegs/notification,validator";
import { JwtAuthGuard } from "src/authguard/jwt-auth.guard";
import { Role } from "src/validators/users.validator";
import { RolesGuard } from "src/validators/RolesGuard/Roluse.guard";
import { Roles } from "src/validators/RolesGuard/Roles";

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.Admin, Role.Customer)
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

    // **4. Foydalanuvchining barcha bildirishnomalarini o‘chirish**
    @Delete(":user_id")
    async deleteAllNotifications(@Param("user_id") user_id: number) {
        return await this.notificationService.deleteAllNotifications(user_id);
    }

    // **5. Foydalanuvchining barcha bildirishnomalarini o‘qilgan deb belgilash**
    @Patch(":user_id/read-all")
    async markAllAsRead(@Param("user_id") user_id: number) {
        return await this.notificationService.markAllAsRead(user_id);
    }

    // **6. Foydalanuvchining o‘qilmagan bildirishnomalarini olish**
    @Get(":user_id/unread")
    async getUnreadNotifications(@Param("user_id") user_id: number) {
        return await this.notificationService.getUnreadNotificationsCount(user_id);
    }
}
