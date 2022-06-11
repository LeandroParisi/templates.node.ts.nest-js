import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@domain/user";

import { UserDatabaseGatewayException } from "../../../exceptions/user.database.gateway.exception";
import { LoggerLogGateway } from "../../../logger/interfaces/logger.log.gateway";
import { UserEntity } from "../../data/user.entity";
import { CreateUserDatabaseGateway } from "../interfaces/crate.user.database.gateway";
import { FindUserByEmailDatabaseGateway } from "../interfaces/find.user.by.email.gateway";
import { UserDatabaseMapper } from "../mapper/user.database.mapper";

@Injectable()
export class UserDatabaseGatewayPostgres
    implements CreateUserDatabaseGateway, FindUserByEmailDatabaseGateway
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async findByEmail(email: string): Promise<User | null> {
        try {
            this.loggerLogGateway.log(email, "FIND USER BY EMAIL DATABASE");

            const userEntity = await this.userEntityRepository.findOneBy({ email });

            return UserDatabaseMapper.mapperUserFromUserEntity(userEntity);
        } catch (error) {
            throw new UserDatabaseGatewayException(error.stack);
        }
    }

    public async create(user: User): Promise<void> {
        try {
            this.loggerLogGateway.log(user, "CREATE USER DATABASE");

            await this.userEntityRepository.insert(
                UserDatabaseMapper.mapperUserEntityFromUser(user)
            );
        } catch (error) {
            throw new UserDatabaseGatewayException(error.stack);
        }
    }
}
