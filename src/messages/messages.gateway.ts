import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "src/validators/messegs/messages.validator";

@WebSocketGateway(3001, { cors: { origin: "*" } })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage("sendMessage")
  async handleSendMessage(@MessageBody() dto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const message = await this.messagesService.createMessage(dto);

    // Foydalanuvchi xonasiga jo‘natish
    this.server.to(`user-${dto.receiverId}`).emit("newMessage", message);

    return message;
  }

  @SubscribeMessage("joinChat")
  handleJoinChat(@MessageBody() userId: number, @ConnectedSocket() client: Socket) {
    client.join(`user-${userId}`); // Foydalanuvchini o‘z xonasiga qo‘shish
  }

  @SubscribeMessage("readMessage")
  async handleReadMessage(@MessageBody() messageId: number, @ConnectedSocket() client: Socket) {
    const message = await this.messagesService.markAsRead(messageId);

    // Xabar yuborgan odamni ham xabardor qilish
    this.server.to(`user-${message.senderId }`).emit("messageRead", { messageId, isRead: true });

    return message;
  }
}
