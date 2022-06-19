import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserDatabaseGatewayException } from "@gateways/exceptions/user.database.gateway.exception";
import { LoggerErrorGateway } from "@gateways/logger/interfaces/logger.error.gateway";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

import { User } from "@domain/user";

import { UserEntity } from "../../data/user.entity";
import { CreateUserDatabaseGateway } from "../crate.user.database.gateway";
import { FindUserByEmailDatabaseGateway } from "../find.user.by.email.gateway";
import { UserDatabaseMapper } from "../mapper/user.database.mapper";

@Injectable()
export class UserDatabaseGateway
    implements CreateUserDatabaseGateway, FindUserByEmailDatabaseGateway
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway,
        @Inject(LoggerErrorGateway)
        private readonly loggerErrorGateway: LoggerErrorGateway
    ) {}

    public async findByEmail(email: string): Promise<User | null> {
        try {
            this.loggerLogGateway.log({
                class: UserDatabaseGateway.name,
                meta: email,
                method: "findByEmail",
            });

            const userEntity = await this.userEntityRepository.findOneBy({ email });

            return UserDatabaseMapper.mapperUserFromUserEntity(userEntity);
        } catch (error) {
            this.loggerErrorGateway.error({
                class: UserDatabaseGateway.name,
                method: "findByEmail",
                meta: error,
            });

            throw new UserDatabaseGatewayException(error.stack);
        }
    }

    public async create(user: User): Promise<void> {
        try {
            this.loggerLogGateway.log({
                class: UserDatabaseGateway.name,
                meta: user,
                method: "create",
            });

            await this.userEntityRepository.insert(
                UserDatabaseMapper.mapperUserEntityFromUser(user)
            );
        } catch (error) {
            this.loggerErrorGateway.error({
                class: UserDatabaseGateway.name,
                method: "create",
                meta: error,
            });
            throw new UserDatabaseGatewayException(error.stack);
        }
    }
}
