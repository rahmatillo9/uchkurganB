import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './notifications.entity';
import { User } from 'src/users/user.entity';
import { Messages } from 'src/messages/messages.entity';
import { NotificationGateway } from './notifications.gateway';


@Module({
  imports: [SequelizeModule.forFeature([Notification, User, Messages])],
  providers: [NotificationService, NotificationGateway],
  controllers: [NotificationController]
})
export class NotificationsModule {}
