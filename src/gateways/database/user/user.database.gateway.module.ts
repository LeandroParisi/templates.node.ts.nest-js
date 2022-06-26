import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "@gateways/logger/logger.module";

import { UserEntity } from "../data/user.entity";
import { CreateUserDatabaseGateway } from "./crate.user.database.gateway";
import { FindUserByEmailDatabaseGateway } from "./find.user.by.email.gateway";
import { UserDatabaseGateway } from "./postgres/user.database.gateway";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
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
