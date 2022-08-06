import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { LoggerErrorGateway } from "@gateways/logger/interfaces/logger.error.gateway";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

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
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway,
        @Inject(LoggerErrorGateway)
        private readonly loggerErrorGateway: LoggerErrorGateway
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
            this.loggerErrorGateway.error({
                class: UserDatabaseGateway.name,
                method: "findAll",
                meta: error,
            });
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
            this.loggerErrorGateway.error({
                class: UserDatabaseGateway.name,
                method: "update",
                meta: error,
            });

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
            this.loggerErrorGateway.error({
                class: UserDatabaseGateway.name,
                method: "findById",
                meta: error,
            });

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
            this.loggerErrorGateway.error({
                class: UserDatabaseGateway.name,
                method: "deleteById",
                meta: error,
            });

            throw new UserDatabaseGatewayException(error.stack);
        }
    }
}
