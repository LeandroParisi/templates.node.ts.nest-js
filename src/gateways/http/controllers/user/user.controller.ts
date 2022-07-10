import { Controller, Post, Body, Inject, Get, CacheKey, CacheTTL, Put } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/exceptions/user.database.gateway.exception";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { UserFacade } from "@use-cases/user/user.facade";

import { User } from "@domain/user";

import { CreateUserRequest, FindAllResponse, UpdateUserRequest } from "./json";
import { UserMapper } from "./mappers/user.mapper";
import { UserCreatePipe, UserUpdatePipe } from "./pipes";

@Controller("user")
@ApiTags("User")
export class UserController {
    constructor(
        private readonly userFacade: UserFacade,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    @Post()
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 422, type: EmailAlreadyExistsBusinessException })
    @ApiBody({ type: CreateUserRequest })
    public async create(@Body(UserCreatePipe) userToCreate: User): Promise<void> {
        this.loggerLogGateway.log({
            class: UserController.name,
            meta: userToCreate,
            method: "create",
        });
        await this.userFacade.create(userToCreate);
    }

    @Get()
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 200, type: FindAllResponse, isArray: true })
    @CacheKey(process.env.CACHE_USERS_KEY)
    @CacheTTL(Number(process.env.CACHE_USERS_TTL))
    public async findAll(): Promise<FindAllResponse[]> {
        this.loggerLogGateway.log({
            class: UserController.name,
            method: "findAll",
        });

        const users = await this.userFacade.findAll();

        return UserMapper.mapperUserToFindAllResponse(users);
    }

    @Put()
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 200 })
    @ApiBody({ type: UpdateUserRequest })
    public async update(@Body(UserUpdatePipe) userToUpdate: User): Promise<void> {
        this.loggerLogGateway.log({
            class: UserController.name,
            method: "update",
            meta: userToUpdate,
        });

        await this.userFacade.update(userToUpdate);
    }
}
