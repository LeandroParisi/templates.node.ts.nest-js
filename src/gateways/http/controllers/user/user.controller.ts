import {
    Controller,
    Post,
    Body,
    Get,
    CacheKey,
    CacheTTL,
    Put,
    UseInterceptors,
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/exceptions/user.database.gateway.exception";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { UserFacade } from "@use-cases/facade";

import { User } from "@domain/user";

import { RequestLoggerInterceptor } from "../interceptors/request.logger.interceptor";
import { CreateUserRequest, FindAllResponse, UpdateUserRequest } from "./json";
import { UserMapper } from "./mappers/user.mapper";
import { UserCreatePipe, UserUpdatePipe } from "./pipes";

@Controller("user")
@ApiTags("User")
@UseInterceptors(RequestLoggerInterceptor)
export class UserController {
    constructor(private readonly userFacade: UserFacade) {}

    @Post()
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 422, type: EmailAlreadyExistsBusinessException })
    @ApiBody({ type: CreateUserRequest })
    public async create(@Body(UserCreatePipe) userToCreate: User): Promise<void> {
        await this.userFacade.create(userToCreate);
    }

    @Get()
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 200, type: FindAllResponse, isArray: true })
    @CacheKey(process.env.CACHE_USERS_KEY)
    @CacheTTL(Number(process.env.CACHE_USERS_TTL))
    public async findAll(): Promise<FindAllResponse[]> {
        const users = await this.userFacade.findAll();

        return UserMapper.mapperUserToFindAllResponse(users);
    }

    @Put()
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 200 })
    @ApiBody({ type: UpdateUserRequest })
    public async update(@Body(UserUpdatePipe) userToUpdate: User): Promise<void> {
        await this.userFacade.update(userToUpdate);
    }
}
