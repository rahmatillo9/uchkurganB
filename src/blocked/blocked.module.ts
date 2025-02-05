import { Module } from '@nestjs/common';
import { BlockedService } from './blocked.service';
import { BlockedController } from './blocked.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blocked } from './blocked.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Blocked, User])],
  providers: [BlockedService],
  controllers: [BlockedController],
  exports: [BlockedService, SequelizeModule],
})
export class BlockedModule {}
