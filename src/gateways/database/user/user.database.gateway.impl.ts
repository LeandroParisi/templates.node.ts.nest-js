import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@domain/user";

import { LoggerService } from "@configs/logger/logger.service";

import { UserDatabaseGatewayException } from "../../exceptions/user.database.gateway.exception";
import { UserEntity } from "../data/user.entity";
import { CreateUserDatabaseGateway } from "./crate.user.database.gateway";
import { FindUserByEmailDatabaseGateway } from "./find.user.by.email.gateway";
import { UserDatabaseMapper } from "./mapper/user.database.mapper";

@Injectable()
export class UserDatabaseGatewayImpl
    implements CreateUserDatabaseGateway, FindUserByEmailDatabaseGateway
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        private readonly loggerService: LoggerService
    ) {}

    public async findByEmail(email: string): Promise<User | null> {
        try {
            this.loggerService.log("FIND USER BY EMAIL DATABASE", email);

            const userEntity = await this.userEntityRepository.findOneBy({ email });

            return UserDatabaseMapper.mapperUserFromUserEntity(userEntity);
        } catch (error) {
            throw new UserDatabaseGatewayException(error.stack);
        }
    }

    public async create(user: User): Promise<void> {
        try {
            this.loggerService.log("CREATE USER DATABASE", user);

            await this.userEntityRepository.insert(
                UserDatabaseMapper.mapperUserEntityFromUser(user)
            );
        } catch (error) {
            throw new UserDatabaseGatewayException(error.stack);
        }
    }
}
