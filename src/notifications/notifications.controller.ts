import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { NotificationService } from "./notifications.service";
import { CreateNotificationDto } from "src/validators/messegs/notification,validator";

@Controller("notifications")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    createNotification(@Body() dto: CreateNotificationDto) {
        return this.notificationService.createNotification(dto);
    }

    @Get(":receiverId")
    getNotifications(@Param("receiverId") receiverId: number) {
        return this.notificationService.getNotifications(receiverId);
    }

    @Patch(":notificationId")
    markAsRead(@Param("notificationId") notificationId: number) {
        return this.notificationService.markAsRead(notificationId);
    }
}
