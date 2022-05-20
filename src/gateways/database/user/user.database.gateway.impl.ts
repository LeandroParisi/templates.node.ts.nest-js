import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@domain/user";

import { ExceptionsService } from "@configs/exceptions/exceptions.service";
import { LoggerService } from "@configs/logger/logger.service";

import { UserEntity } from "../data/user.entity";
import { UserDatabaseMapper } from "./mapper/user.database.mapper";
import { UserDatabaseGateway } from "./user.database.gateway";

@Injectable()
export class UserDatabaseGatewayImpl implements UserDatabaseGateway {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        private readonly exceptionsService: ExceptionsService,
        private readonly loggerService: LoggerService
    ) {}

    public async insert(user: User): Promise<void> {
        try {
            await this.userEntityRepository.insert(
                UserDatabaseMapper.mapperUserEntityFromUser(user)
            );
        } catch (error) {
            this.loggerService.error("database", "Error to insert user");
            throw this.exceptionsService.internalServerErrorException();
        }
    }
}
