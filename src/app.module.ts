import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './authguard/JwtModule ';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { SearchModule } from './search/search.module';
import { CategoryModule } from './category/category.module';
import { MessagesModule } from './messages/messages.module';
import { BlockedService } from './blocked/blocked.service';
import { BlockedModule } from './blocked/blocked.module';
import { NotificationsModule } from './notifications/notifications.module';
import * as dotenv from "dotenv";
import { PostImageModule } from './postImage/post-image.module';
dotenv.config();
@Module({
  imports: [
    UsersModule,
    AuthModule,
   SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,

      pool: {
        max: 10, // Eng ko‘p 10 ta ulanish
        min: 2,  // Eng kamida 2 ta ulanish
        acquire: 30000, // 30s ichida ulana olmasa, timeout
        idle: 10000, // 10s harakatsiz bo‘lsa, ulanish yopiladi
      },
    }),
   PostModule,
   CommentModule,
   LikeModule,
   SearchModule,
   CategoryModule,
   MessagesModule,
   BlockedModule,
   NotificationsModule,
   PostImageModule




  ],
  providers: [BlockedService],
})
export class AppModule {}


  