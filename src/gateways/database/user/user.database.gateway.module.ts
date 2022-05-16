import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ExceptionsModule } from "@configs/exceptions/exceptions.module";
import { LoggerModule } from "@configs/logger/logger.module";
import { TypeOrmConfigModule } from "@configs/typeorm/typeorm.module";

import { UserEntity } from "../data/user.entity";
import { UserDatabaseGatewayImpl } from "./user.database.gateway.impl";

@Module({
    imports: [
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([UserEntity]),
        ExceptionsModule,
        LoggerModule,
    ],
    providers: [UserDatabaseGatewayImpl],
    exports: [UserDatabaseGatewayImpl],
})
export class UserDataBaseGatewayModule {}
