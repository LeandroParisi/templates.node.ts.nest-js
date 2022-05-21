import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@domain/user";

import { LoggerService } from "@configs/logger/logger.service";

import { CreateUserGatewayException } from "../../exceptions/create.user.gateway.exception";
import { UserEntity } from "../data/user.entity";
import { UserDatabaseMapper } from "./mapper/user.database.mapper";
import { UserDatabaseGateway } from "./user.database.gateway";

@Injectable()
export class UserDatabaseGatewayImpl implements UserDatabaseGateway {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        private readonly loggerService: LoggerService
    ) {}

    public async create(user: User): Promise<void> {
        try {
            this.loggerService.log("CREATE USER DATABASE", user);

            await this.userEntityRepository.insert(
                UserDatabaseMapper.mapperUserEntityFromUser(user)
            );
        } catch (error) {
            throw new CreateUserGatewayException(error.stack);
        }
    }
}
