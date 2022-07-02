import { Controller, Post, Body, Inject, Get, CacheKey, CacheTTL } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/exceptions/user.database.gateway.exception";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { UserFacade } from "@use-cases/user/user.facade";

import { User } from "@domain/user";

import { FindAllResponse } from "./json/find.all.response";
import { UserMapper } from "./mappers/user.mapper";
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
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 422, type: EmailAlreadyExistsBusinessException })
    public async create(@Body(UserValidationTransformPipe) userToCreate: User): Promise<void> {
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
}
