import { Controller, Post, Body } from "@nestjs/common";
import {
    ApiTags,
    ApiInternalServerErrorResponse,
    ApiUnprocessableEntityResponse,
    ApiCreatedResponse,
    ApiExtraModels,
} from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/exceptions/user.database.gateway.exception";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { UserFacade } from "@use-cases/user/user.facade";

import { ErrorResponseHandler } from "@configs/exeception-handler/error.response.handler";
import { LoggerService } from "@configs/logger/logger.service";

import { CreateUserRequest } from "./json";
import { UserMapper } from "./mappers";

@Controller("user")
@ApiTags("User")
@ApiExtraModels(ErrorResponseHandler)
export class UserController {
    constructor(
        private readonly userFacade: UserFacade,
        private readonly loggerService: LoggerService
    ) {}

    @Post("create")
    @ApiCreatedResponse()
    @ApiInternalServerErrorResponse({ type: () => UserDatabaseGatewayException })
    @ApiUnprocessableEntityResponse({
        type: () => EmailAlreadyExistsBusinessException,
    })
    public async create(@Body() createUserRequest: CreateUserRequest): Promise<void> {
        this.loggerService.log("CREATE USER CONTROLLER", createUserRequest);

        const userToCreate = UserMapper.mapperUserFromCreateRequest(createUserRequest);

        await this.userFacade.create(userToCreate);
    }
}
