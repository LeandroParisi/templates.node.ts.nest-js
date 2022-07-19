import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "@gateways/logger/logger.module";

import { UserEntity } from "../data/user.entity";
import { CreateUserDatabaseGateway } from "./crate.user.database.gateway";
import { DeleteUserByIdDatabaseGateway } from "./delete.user.by.id.database.gateway";
import { FindUserByEmailDatabaseGateway } from "./find.user.by.email.gateway";
import { FindUserByIdDatabaseGateway } from "./find.user.by.id.database.gateway";
import { FindAllUserDatabaseGateway } from "./findall.user.database.gateway";
import { UserDatabaseGateway } from "./postgres/user.database.gateway";
import { UpdateUserDatabaseGateway } from "./update.user.database.gateway";

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
        {
            provide: FindAllUserDatabaseGateway,
            useClass: UserDatabaseGateway,
        },
        {
            provide: UpdateUserDatabaseGateway,
            useClass: UserDatabaseGateway,
        },
        {
            provide: FindUserByIdDatabaseGateway,
            useClass: UserDatabaseGateway,
        },

        {
            provide: DeleteUserByIdDatabaseGateway,
            useClass: UserDatabaseGateway,
        },
    ],
    exports: [
        CreateUserDatabaseGateway,
        FindUserByEmailDatabaseGateway,
        FindAllUserDatabaseGateway,
        UpdateUserDatabaseGateway,
        FindUserByIdDatabaseGateway,
        DeleteUserByIdDatabaseGateway,
    ],
})
export class UserDataBaseGatewayModule {}
