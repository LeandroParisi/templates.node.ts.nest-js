import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

import {
    CreateUserUseCase,
    FindAllUserUseCase,
    UpdateUserUseCase,
    FindUserByIdUserUseCase,
} from "../user";

@Injectable()
export class UserFacade {
    constructor(
        private readonly findAllUserUseCase: FindAllUserUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly findUserByIdUserUseCase: FindUserByIdUserUseCase,
        @Inject(LoggerLogGateway)
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
}
