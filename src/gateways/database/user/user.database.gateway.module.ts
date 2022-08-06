import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "@gateways/logger/logger.module";

import { UserEntity } from "../data/user.entity";
import { CreateUserDatabaseGatewayKey } from "./crate.user.database.gateway";
import { DeleteUserByIdDatabaseGatewayKey } from "./delete.user.by.id.database.gateway";
import { FindUserByEmailDatabaseGatewayKey } from "./find.user.by.email.gateway";
import { FindUserByIdDatabaseGatewayKey } from "./find.user.by.id.database.gateway";
import { FindAllUserDatabaseGatewayKey } from "./findall.user.database.gateway";
import { UserDatabaseGateway } from "./postgres/user.database.gateway";
import { UpdateUserDatabaseGatewayKey } from "./update.user.database.gateway";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
    providers: [
        {
            provide: CreateUserDatabaseGatewayKey,
            useClass: UserDatabaseGateway,
        },
        {
            provide: FindUserByEmailDatabaseGatewayKey,
            useClass: UserDatabaseGateway,
        },
        {
            provide: FindAllUserDatabaseGatewayKey,
            useClass: UserDatabaseGateway,
        },
        {
            provide: UpdateUserDatabaseGatewayKey,
            useClass: UserDatabaseGateway,
        },
        {
            provide: FindUserByIdDatabaseGatewayKey,
            useClass: UserDatabaseGateway,
        },

        {
            provide: DeleteUserByIdDatabaseGatewayKey,
            useClass: UserDatabaseGateway,
        },
    ],
    exports: [
        CreateUserDatabaseGatewayKey,
        FindUserByEmailDatabaseGatewayKey,
        FindAllUserDatabaseGatewayKey,
        UpdateUserDatabaseGatewayKey,
        FindUserByIdDatabaseGatewayKey,
        DeleteUserByIdDatabaseGatewayKey,
    ],
})
export class UserDataBaseGatewayModule {}
