import { Injectable } from "@nestjs/common";
import { User } from "src/domain/index";

import { LoggerService } from "@configs/logger/logger.service";

import { CreateUserUseCase } from "./create.user.usecase";

@Injectable()
export class UserFacade {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loggerService: LoggerService
    ) {}

    public async create(userToCreate: User): Promise<void> {
        this.loggerService.log("CREATE USER FACADE", userToCreate);

        await this.createUserUseCase.create(userToCreate);
    }
}
