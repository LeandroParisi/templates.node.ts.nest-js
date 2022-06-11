import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TypeOrmConfigModule } from "@gateways/database/user/postgress/typeorm.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { UserEntity } from "../data/user.entity";
import { CreateUserDatabaseGateway } from "./interfaces/crate.user.database.gateway";
import { FindUserByEmailDatabaseGateway } from "./interfaces/find.user.by.email.gateway";
import { UserDatabaseGatewayPostgres } from "./postgress/user.database.gateway.postgres";

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserEntity]), LoggerModule],
    providers: [
        {
            provide: CreateUserDatabaseGateway,
            useClass: UserDatabaseGatewayPostgres,
        },
        {
            provide: FindUserByEmailDatabaseGateway,
            useClass: UserDatabaseGatewayPostgres,
        },
    ],
    exports: [CreateUserDatabaseGateway, FindUserByEmailDatabaseGateway],
})
export class UserDataBaseGatewayModule {}
