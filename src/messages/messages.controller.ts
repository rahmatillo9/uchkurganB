import { Controller, Post, Body, Get, Param, Delete, Patch } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "src/validators/messegs/messages.validator";
import { Messages } from "./messages.entity";

@Controller("messages")
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    sendMessage(@Body() dto: CreateMessageDto) {
        return this.messagesService.sendMessage(dto);
    }



    @Get(":userId/:otherUserId")
    getMessages(@Param("userId") userId: number, @Param("otherUserId") otherUserId: number) {
        return this.messagesService.getMessages(userId, otherUserId);
    }

    @Get(":id")
    getMessageById(@Param("id") id: number) {
        return this.messagesService.getMessageById(id);
    }

    @Patch("read/:id")
    async readMessage(@Param("id") id: number) {
      return this.messagesService.markAsRead(id);
    }

    @Delete(":id")
    deleteMessage(@Param("id") id: number) {
        return this.messagesService.deleteMessage(id);
    }
}
