import { Controller, Post, Body, Delete, Param, Get } from "@nestjs/common";
import { BlockedService } from "./blocked.service";
import { BlockUserDto } from "src/validators/messegs/blocked.validator";

@Controller("blocked")
export class BlockedController {
    constructor(private readonly blockedService: BlockedService) {}

    @Post()
    blockUser(@Body() dto: BlockUserDto) {
        return this.blockedService.blockUser(dto);
    }

    @Delete(":blockerId/:blockedId")
    unblockUser(@Param("blockerId") blockerId: number, @Param("blockedId") blockedId: number) {
        return this.blockedService.unblockUser(blockerId, blockedId);
    }

    @Get(":blockerId")
    getBlockedUsers(@Param("blockerId") blockerId: number) {
        return this.blockedService.getBlockedUsers(blockerId);
    }
}
