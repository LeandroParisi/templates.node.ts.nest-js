import { Injectable, PipeTransform } from "@nestjs/common";

import { RequestValidationBase } from "@gateways/http/controllers/pipes/request.validation.base";

import { User } from "@domain/user";

import { CreateUserRequestJson } from "../json/create.user.request.json";
import { UserMapper } from "./mappers/user.mapper";

@Injectable()
export class UserCreatePipe
    extends RequestValidationBase
    implements PipeTransform<CreateUserRequestJson, Promise<User>>
{
    async transform(createUserRequest: CreateUserRequestJson) {
        this.checkEmptyBody(createUserRequest);

        await this.validateClass<CreateUserRequestJson>(CreateUserRequestJson, createUserRequest);

        return UserMapper.mapperUserFromCreateRequest(createUserRequest);
    }
}
