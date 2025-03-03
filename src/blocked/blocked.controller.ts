import { Controller, Post, Body, Delete, Param, Get, UseGuards } from "@nestjs/common";
import { BlockedService } from "./blocked.service";
import { BlockUserDto } from "src/validators/messegs/blocked.validator";


import { JwtAuthGuard } from "src/authguard/jwt-auth.guard";
import { Role } from "src/validators/users.validator";
import { RolesGuard } from "src/validators/RolesGuard/Roluse.guard";
import { Roles } from "src/validators/RolesGuard/Roles";


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Customer)
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
