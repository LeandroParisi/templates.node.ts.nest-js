import { Controller, Post, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/exceptions/user.database.gateway.exception";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { UserFacade } from "@use-cases/user/user.facade";

import { User } from "@domain/user";

import { UserValidationTransformPipe } from "./pipes/user.validation.transform.pipe";

@Controller("user")
@ApiTags("User")
export class UserController {
    constructor(
        private readonly userFacade: UserFacade,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    @Post("create")
    @ApiResponse({ status: 201, description: "No response object" })
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 422, type: EmailAlreadyExistsBusinessException })
    public async create(@Body(UserValidationTransformPipe) userToCreate: User): Promise<void> {
        this.loggerLogGateway.log(userToCreate, "CREATE USER CONTROLLER");
        await this.userFacade.create(userToCreate);
    }
}
