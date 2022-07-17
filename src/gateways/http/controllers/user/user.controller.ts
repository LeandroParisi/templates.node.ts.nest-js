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
import { ResponseMapperInterceptor } from "../interceptors/response.mapper.interceptor";
import { CreateUserRequest, FindAllResponse, UpdateUserRequest } from "./json";
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
    @UseInterceptors(new ResponseMapperInterceptor(FindAllResponse))
    public async findAll(): Promise<User[]> {
        return await this.userFacade.findAll();
    }

    @Put()
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 200 })
    @ApiBody({ type: UpdateUserRequest })
    public async update(@Body(UserUpdatePipe) userToUpdate: User): Promise<void> {
        await this.userFacade.update(userToUpdate);
    }
}
