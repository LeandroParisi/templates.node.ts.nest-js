import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateUserUseCase } from "@use-cases/create.user.usecase";

import { CreateUserRequest } from "./json";
import { UserMapper } from "./mappers";

@Controller("user")
@ApiTags("User")
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    @Post("create")
    public async create(@Body() createUserRequest: CreateUserRequest): Promise<void> {
        const userToCreate = UserMapper.mapperUserFromCreateRequest(createUserRequest);

        await this.createUserUseCase.create(userToCreate);
    }
}
