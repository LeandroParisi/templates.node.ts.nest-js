import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { User } from "@domain/user";

import { UserEntity } from "../../data/user.entity";
import { CreateUserDatabaseGateway } from "../crate.user.database.gateway";
import { DeleteUserByIdDatabaseGateway } from "../delete.user.by.id.database.gateway";
import { FindUserByEmailDatabaseGateway } from "../find.user.by.email.gateway";
import { FindUserByIdDatabaseGateway } from "../find.user.by.id.database.gateway";
import { FindAllUserDatabaseGateway } from "../findall.user.database.gateway";
import { UserDatabaseMapper } from "../mapper/user.database.mapper";
import { UpdateUserDatabaseGateway } from "../update.user.database.gateway";

@Injectable()
export class UserDatabaseGateway
    implements
        CreateUserDatabaseGateway,
        FindUserByEmailDatabaseGateway,
        FindAllUserDatabaseGateway,
        UpdateUserDatabaseGateway,
        FindUserByIdDatabaseGateway,
        DeleteUserByIdDatabaseGateway
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async findAll(): Promise<User[]> {
        try {
            this.loggerLogGateway.log({
                class: UserDatabaseGateway.name,
                method: "findAll",
            });

            const usersEntity = await this.userEntityRepository.find();

            return usersEntity.map((userEntity) => {
                return UserDatabaseMapper.mapperUserFromUserEntity(userEntity);
            });
        } catch (error) {
            throw new UserDatabaseGatewayException(error.stack);
        }
    }

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
            throw new UserDatabaseGatewayException(error.stack);
        }
    }

    public async update(userToUpdate: User): Promise<void> {
        try {
            this.loggerLogGateway.log({
                class: UserDatabaseGateway.name,
                method: "update",
                meta: userToUpdate,
            });

            const userToUpdateMapped = UserDatabaseMapper.mapperUserEntityFromUser(userToUpdate);

            await this.userEntityRepository.update(
                {
                    id: userToUpdateMapped.id,
                },
                userToUpdateMapped
            );
        } catch (error) {
            throw new UserDatabaseGatewayException(error.stack);
        }
    }

    public async findById(id: number): Promise<User | null> {
        try {
            this.loggerLogGateway.log({
                class: UserDatabaseGateway.name,
                meta: id,
                method: "findById",
            });

            const userEntity = await this.userEntityRepository.findOneBy({ id });

            return UserDatabaseMapper.mapperUserFromUserEntity(userEntity);
        } catch (error) {
            throw new UserDatabaseGatewayException(error.stack);
        }
    }

    public async deleteById(id: number): Promise<void> {
        try {
            this.loggerLogGateway.log({
                class: UserDatabaseGateway.name,
                meta: id,
                method: "deleteById",
            });

            await this.userEntityRepository.delete({ id });
        } catch (error) {
            throw new UserDatabaseGatewayException(error.stack);
        }
    }
}
