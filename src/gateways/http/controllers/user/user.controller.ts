import { Controller, Body, UseInterceptors, ParseIntPipe, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserFacade } from "@use-cases/facade";

import { User } from "@domain/user";

import { RequestLoggerInterceptor } from "../common/interceptors/request.logger.interceptor";
import {
    CreateUserDecorator,
    DeleteUserDecorator,
    FindAllUserDecorator,
    FindUserByIdDecorator,
    UpdateUserDecorator,
} from "./decorators";
import { UserCreatePipe, UserUpdatePipe } from "./pipes";

@Controller("user")
@ApiTags("User")
@UseInterceptors(RequestLoggerInterceptor)
export class UserController {
    constructor(private readonly userFacade: UserFacade) {}

    @CreateUserDecorator()
    public async create(@Body(UserCreatePipe) userToCreate: User): Promise<void> {
        await this.userFacade.create(userToCreate);
    }

    @FindAllUserDecorator()
    public async findAll(): Promise<User[]> {
        return await this.userFacade.findAll();
    }

    @UpdateUserDecorator()
    public async update(@Body(UserUpdatePipe) userToUpdate: User): Promise<void> {
        await this.userFacade.update(userToUpdate);
    }

    @FindUserByIdDecorator()
    public async findById(@Param("id", ParseIntPipe) id: number): Promise<User> {
        return await this.userFacade.findById(id);
    }

    @DeleteUserDecorator()
    public async deleteById(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.userFacade.deleteById(id);
    }
}
