import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TypeOrmConfigModule } from "@gateways/database/user/postgres/typeorm.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { UserEntity } from "../data/user.entity";
import { CreateUserDatabaseGateway } from "./crate.user.database.gateway";
import { FindUserByEmailDatabaseGateway } from "./find.user.by.email.gateway";
import { UserDatabaseGateway } from "./postgres/user.database.gateway";

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserEntity]), LoggerModule],
    providers: [
        {
            provide: CreateUserDatabaseGateway,
            useClass: UserDatabaseGateway,
        },
        {
            provide: FindUserByEmailDatabaseGateway,
            useClass: UserDatabaseGateway,
        },
    ],
    exports: [CreateUserDatabaseGateway, FindUserByEmailDatabaseGateway],
})
export class UserDataBaseGatewayModule {}
