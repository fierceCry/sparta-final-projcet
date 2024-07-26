import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "./database/typeorm/typeorm.module";
import { RedisModule } from "./database/redis/redis.module";

import { JobsModule } from './modules/jobs/jobs.module';
import { UserLocalModule } from "./modules/auth/local/local.module";
import { EmailModule } from "./modules/auth/common/email/email.module";
import { JwtModule } from "./modules/auth/common/jwt/jwt.module";
import { UserSignOutModule } from "./modules/auth/common/sign-out/sign-out.module";
import { UsersModule } from "./modules/users/users.module";
import { FindAccountModule } from "./modules/auth/common/find-account/find-account.module";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";
<<<<<<< HEAD
import { NotificationsModule } from './notifications/notifications.module';
import { MotificationsController } from './motifications/motifications.controller';
=======
import { NoticesModule } from "./modules/notices/notices.module";
import { ReportsModule } from "./modules/reports/reports.module";

import { ChatModule } from "./modules/chat/chat.module";
>>>>>>> e2b167f597822ce1da11558e224d0af735e89598

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule,
    JobsModule,
    RedisModule,
    EmailModule,
    UserLocalModule,
    JwtModule,
    UserSignOutModule,
    UsersModule,
<<<<<<< HEAD
    NotificationsModule,
=======
    ChatModule,
    FindAccountModule,
    NoticesModule,
    ReportsModule,
>>>>>>> e2b167f597822ce1da11558e224d0af735e89598
  ],
  controllers: [AppController, MotificationsController],
  providers: [AppService],
})
export class AppModule {}
