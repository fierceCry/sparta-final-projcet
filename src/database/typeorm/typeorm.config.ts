import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      url: this.configService.get<string>("MYSQL_URI"),
      logging: ["error", "warn"],
      entities: [__dirname + "/../entities/**/*.entity.{js,ts}"],
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
