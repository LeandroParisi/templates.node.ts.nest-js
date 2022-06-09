import { Controller, Post, Body, Inject } from "@nestjs/common";
import {
    ApiTags,
    ApiInternalServerErrorResponse,
    ApiUnprocessableEntityResponse,
    ApiCreatedResponse,
    ApiExtraModels,
} from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/exceptions/user.database.gateway.exception";
import { LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { UserFacade } from "@use-cases/user/user.facade";

import { ErrorResponseHandler } from "@common/filters/exception/error.response.handler";

import { CreateUserRequest } from "./json";
import { UserMapper } from "./mappers";

@Controller("user")
@ApiTags("User")
@ApiExtraModels(ErrorResponseHandler)
export class UserController {
    constructor(
        private readonly userFacade: UserFacade,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    @Post("create")
    @ApiCreatedResponse()
    @ApiInternalServerErrorResponse({ type: () => UserDatabaseGatewayException })
    @ApiUnprocessableEntityResponse({
        type: () => EmailAlreadyExistsBusinessException,
    })
    public async create(@Body() createUserRequest: CreateUserRequest): Promise<void> {
        this.loggerLogGateway.log(createUserRequest, "CREATE USER CONTROLLER");

        const userToCreate = UserMapper.mapperUserFromCreateRequest(createUserRequest);

        await this.userFacade.create(userToCreate);
    }
}
