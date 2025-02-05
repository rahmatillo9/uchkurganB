import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "src/validators/messegs/messages.validator";

@WebSocketGateway({ cors: true })
export class MessagesGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messagesService: MessagesService) {}

    @SubscribeMessage("sendMessage")
    async handleSendMessage(@MessageBody() dto: CreateMessageDto, @ConnectedSocket() client: Socket) {
      
        const message = await this.messagesService.createMessage(dto);

        // Xabar qabul qiluvchiga jo‘natiladi
        this.server.to(`user-${dto.receiverId}`).emit("newMessage", message);

        return message;
    }

    @SubscribeMessage("joinChat")
    handleJoinChat(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        client.join(room);
    }

    @SubscribeMessage("readMessage")
async handleReadMessage(@MessageBody() messageId: number, @ConnectedSocket() client: Socket) {
    const message = await this.messagesService.markAsRead(messageId);

    // Xabarni yuborgan foydalanuvchiga o‘qilganligi haqida bildirishnoma yuboriladi
    client.emit("messageRead", { messageId, isRead: true });

    return message;
}

}
