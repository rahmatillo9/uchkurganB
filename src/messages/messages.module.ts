import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Messages } from './messages.entity';
import { Blocked } from 'src/blocked/blocked.entity';
import { User } from 'src/users/user.entity';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Messages, Blocked, User])],
  providers: [MessagesService, MessagesGateway],
  controllers: [MessagesController]
})
export class MessagesModule {}
