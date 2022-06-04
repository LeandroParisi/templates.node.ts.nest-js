import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "@configs/logger/logger.module";
import { TypeOrmConfigModule } from "@configs/typeorm/typeorm.module";

import { UserEntity } from "../data/user.entity";
import { CreateUserDatabaseGateway } from "./crate.user.database.gateway";
import { FindUserByEmailDatabaseGateway } from "./find.user.by.email.gateway";
import { UserDatabaseGatewayImpl } from "./user.database.gateway.impl";

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserEntity]), LoggerModule],
    providers: [
        {
            provide: CreateUserDatabaseGateway,
            useClass: UserDatabaseGatewayImpl,
        },
        {
            provide: FindUserByEmailDatabaseGateway,
            useClass: UserDatabaseGatewayImpl,
        },
    ],
    exports: [CreateUserDatabaseGateway, FindUserByEmailDatabaseGateway],
})
export class UserDataBaseGatewayModule {}
