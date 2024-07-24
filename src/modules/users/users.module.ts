import { Module } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";

import { UsersService } from "src/modules/users/users.service";
import { UsersController } from "src/modules/users/users.controller";

import { UsersEntity } from "src/entities/users.entity";

@Module({
  imports: [NestTypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
