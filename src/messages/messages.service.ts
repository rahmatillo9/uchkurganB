import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Messages } from "./messages.entity";
import { CreateMessageDto } from "src/validators/messegs/messages.validator";
import { Blocked } from "src/blocked/blocked.entity";

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Messages) private readonly messageModel: typeof Messages,
        @InjectModel(Blocked) private readonly blockedModel: typeof Blocked
    ) {}

    // **1. Xabar yuborish**
    async sendMessage(dto: CreateMessageDto) {
        const isBlocked = await this.blockedModel.findOne({
            where: { blockerId: dto.receiverId, blockedId: dto.senderId }
        });

        if (isBlocked) {
            throw new ForbiddenException("Siz bu foydalanuvchiga xabar yubora olmaysiz!");
        }
        const messegData = {
            senderId: dto.senderId,
            receiverId: dto.receiverId,
            message: dto.message,
        }

        return await this.messageModel.create(messegData as any);
    }

    // **2. Foydalanuvchilarning xabarlarini olish**
    async getMessages(userId: number, otherUserId: number) {
        return await this.messageModel.findAll({
            where: {
                senderId: [userId, otherUserId],
                receiverId: [userId, otherUserId],
            },
            order: [["createdAt", "ASC"]]
        });
    }

    // **3. Bitta xabarni olish**
    async getMessageById(id: number) {
        const message = await this.messageModel.findByPk(id);
        if (!message) throw new NotFoundException("Xabar topilmadi!");
        return message;
    }

    async createMessage(dto: CreateMessageDto) {
        const isBlocked = await this.blockedModel.findOne({
            where: { blockerId: dto.receiverId, blockedId: dto.senderId },
        });
    
        if (isBlocked) {
            throw new Error("Bu foydalanuvchi sizni bloklagan.");
        }

        const messegData = {
            senderId: dto.senderId,
            receiverId: dto.receiverId,
            message: dto.message,
        }
    
        return await this.messageModel.create(messegData as any);
    }

    async markAsRead(messageId: number) {
        const message = await this.messageModel.findByPk(messageId);
        if (!message) {
            throw new NotFoundException("Xabar topilmadi");
        }
        
        message.isRead = true;
        await message.save();
    
        return { messageId, isRead: true };
    }
    
    

    // **4. Xabarni o‘chirish**
    async deleteMessage(id: number) {
        const message = await this.getMessageById(id);
        await message.destroy();
        return { message: "Xabar o‘chirildi" };
    }
}
