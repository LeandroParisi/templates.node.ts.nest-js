import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import {
    CreateUserUseCase,
    FindAllUserUseCase,
    UpdateUserUseCase,
    FindUserByIdUserUseCase,
    DeleteUserByIdUseCase,
} from "../user";

@Injectable()
export class UserFacade {
    constructor(
        private readonly findAllUserUseCase: FindAllUserUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly findUserByIdUserUseCase: FindUserByIdUserUseCase,
        private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async create(userToCreate: User): Promise<void> {
        this.loggerLogGateway.log({
            class: UserFacade.name,
            meta: userToCreate,
            method: "create",
        });

        await this.createUserUseCase.create(userToCreate);
    }

    public async findAll(): Promise<User[]> {
        this.loggerLogGateway.log({
            class: UserFacade.name,
            method: "findAll",
        });

        return this.findAllUserUseCase.findAll();
    }

    public async update(userToUpdate: User): Promise<void> {
        this.loggerLogGateway.log({
            class: UserFacade.name,
            method: "update",
            meta: userToUpdate,
        });

        await this.updateUserUseCase.update(userToUpdate);
    }

    public async findById(id: number): Promise<User> {
        this.loggerLogGateway.log({
            class: UserFacade.name,
            method: "findById",
            meta: { id },
        });

        return this.findUserByIdUserUseCase.findById(id);
    }

    public async deleteById(id: number): Promise<void> {
        this.loggerLogGateway.log({
            class: UserFacade.name,
            method: "deleteById",
            meta: { id },
        });

        await this.deleteUserByIdUseCase.deleteById(id);
    }
}
