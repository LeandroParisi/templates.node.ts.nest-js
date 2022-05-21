import { Controller, Post, Body } from "@nestjs/common";
import {
    ApiTags,
    ApiInternalServerErrorResponse,
    ApiCreatedResponse,
    ApiResponse,
    ApiExtraModels,
} from "@nestjs/swagger";

import { CreateUserGatewayException } from "@gateways/exceptions/create.user.gateway.exception";

import { CreateUserUseCase } from "@use-cases/create.user.usecase";

import { ErrorResponseHandler } from "@configs/exeception-handler/error.response.handler";
import { LoggerService } from "@configs/logger/logger.service";

import { CreateUserRequest } from "./json";
import { UserMapper } from "./mappers";

@Controller("user")
@ApiTags("User")
@ApiExtraModels(ErrorResponseHandler)
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loggerService: LoggerService
    ) {}

    @Post("create")
    @ApiCreatedResponse()
    @ApiInternalServerErrorResponse({ type: () => CreateUserGatewayException, isArray: false })
    public async create(@Body() createUserRequest: CreateUserRequest): Promise<void> {
        this.loggerService.log("CREATE USER CONTROLLER", createUserRequest);

        const userToCreate = UserMapper.mapperUserFromCreateRequest(createUserRequest);

        await this.createUserUseCase.create(userToCreate);
    }
}
