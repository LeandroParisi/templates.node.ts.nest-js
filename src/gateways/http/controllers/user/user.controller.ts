import { Controller, Post, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/exceptions/user.database.gateway.exception";
import { LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { UserFacade } from "@use-cases/user/user.facade";

import { CreateUserRequest } from "./json";
import { UserMapper } from "./mappers";

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
    public async create(@Body() createUserRequest: CreateUserRequest): Promise<void> {
        this.loggerLogGateway.log(createUserRequest, "CREATE USER CONTROLLER");

        const userToCreate = UserMapper.mapperUserFromCreateRequest(createUserRequest);

        await this.userFacade.create(userToCreate);
    }
}
