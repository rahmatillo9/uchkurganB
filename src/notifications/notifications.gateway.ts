import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";
import { NotificationService } from "./notifications.service";
import { CreateNotificationDto } from "src/validators/messegs/notification,validator";

@WebSocketGateway(3001, { cors: true })
export class NotificationGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly notificationService: NotificationService) {}

    // Bildirishnoma yaratish va uni real-time yuborish
    @SubscribeMessage("sendNotification")
    async sendNotification(@MessageBody() dto: CreateNotificationDto) {
        const notification = await this.notificationService.createNotification(dto);

        // Foydalanuvchiga real-time xabar yuborish
        this.server.to(`user-${dto.userId}`).emit("newNotification", notification);

        return notification;

        
    }
}
