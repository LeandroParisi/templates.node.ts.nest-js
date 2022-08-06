import {
    Controller,
    Post,
    Body,
    Get,
    CacheKey,
    CacheTTL,
    Put,
    UseInterceptors,
    ParseIntPipe,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { UserNotFoundBusinessException } from "@use-cases/exceptions/user.not.found.business.exception";
import { UserFacade } from "@use-cases/facade";

import { User } from "@domain/user";

import { JwtAuthGuard } from "../guards/jwt.auth.guard";
import { RequestLoggerInterceptor } from "../interceptors/request.logger.interceptor";
import { ResponseMapperInterceptor } from "../interceptors/response.mapper.interceptor";
import {
    CreateUserRequestJson,
    FindAllResponseJson,
    UpdateUserRequestJson,
    FindByIdResponseJson,
} from "./json";
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
    @ApiBody({ type: CreateUserRequestJson })
    public async create(@Body(UserCreatePipe) userToCreate: User): Promise<void> {
        await this.userFacade.create(userToCreate);
    }

    @Get()
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 200, type: FindAllResponseJson, isArray: true })
    @CacheKey(process.env.CACHE_USERS_KEY)
    @CacheTTL(Number(process.env.CACHE_USERS_TTL))
    @UseInterceptors(new ResponseMapperInterceptor(FindAllResponseJson))
    @UseGuards(JwtAuthGuard)
    public async findAll(): Promise<User[]> {
        return await this.userFacade.findAll();
    }

    @Put()
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 200 })
    @ApiBody({ type: UpdateUserRequestJson })
    @UseGuards(JwtAuthGuard)
    public async update(@Body(UserUpdatePipe) userToUpdate: User): Promise<void> {
        await this.userFacade.update(userToUpdate);
    }

    @Get(":id")
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 400, type: UserNotFoundBusinessException })
    @ApiResponse({ status: 200, type: FindByIdResponseJson })
    @ApiParam({ name: "id", type: "number", required: true })
    @UseInterceptors(new ResponseMapperInterceptor(FindByIdResponseJson))
    @UseGuards(JwtAuthGuard)
    public async findById(@Param("id", ParseIntPipe) id: number): Promise<User> {
        return await this.userFacade.findById(id);
    }

    @Delete(":id")
    @ApiResponse({ status: 500, type: UserDatabaseGatewayException })
    @ApiResponse({ status: 400, type: UserNotFoundBusinessException })
    @ApiResponse({ status: 200 })
    @ApiParam({ name: "id", type: "number", required: true })
    @UseGuards(JwtAuthGuard)
    public async deleteById(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.userFacade.deleteById(id);
    }
}
