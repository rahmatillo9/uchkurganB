import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Blocked } from "./blocked.entity";
import { BlockUserDto } from "src/validators/messegs/blocked.validator";

@Injectable()
export class BlockedService {
    constructor(@InjectModel(Blocked) private readonly blockedModel: typeof Blocked) {}

    // **1. Foydalanuvchini bloklash**
    async blockUser(dto: BlockUserDto) {
        if (dto.blockerId === dto.blockedId) {
            throw new ConflictException("O‘zingizni bloklay olmaysiz!");
        }

        const existingBlock = await this.blockedModel.findOne({
            where: { blockerId: dto.blockerId, blockedId: dto.blockedId }
        });

        if (existingBlock) {
            throw new ConflictException("Siz bu foydalanuvchini allaqachon bloklagansiz!");
        }
        const blockedData = {
            blockerId: dto.blockerId,
            blockedId: dto.blockedId,

        }

        return await this.blockedModel.create(blockedData as any);
    }

    // **2. Foydalanuvchini blokdan chiqarish**
    async unblockUser(blockerId: number, blockedId: number) {
        const blockRecord = await this.blockedModel.findOne({
            where: { blockerId, blockedId }
        });

        if (!blockRecord) {
            throw new NotFoundException("Bu foydalanuvchi bloklanmagan!");
        }

        await blockRecord.destroy();
        return { message: "Foydalanuvchi blokdan chiqarildi" };
    }

    // **3. Bloklangan foydalanuvchilar ro‘yxatini olish**
    async getBlockedUsers(blockerId: number) {
        return await this.blockedModel.findAll({ where: { blockerId } });
    }
}
