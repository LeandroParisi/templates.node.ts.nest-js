import { Injectable, PipeTransform } from "@nestjs/common";

import { User } from "@domain/user";

import { RequestValidationBase } from "@common/pipes/request.validation.base";

import { CreateUserRequest } from "../json/create.user.request";
import { UserMapper } from "./mappers/user.mapper";

@Injectable()
export class UserValidationTransformPipe
    extends RequestValidationBase
    implements PipeTransform<CreateUserRequest, Promise<User>>
{
    async transform(createUserRequest: CreateUserRequest) {
        this.checkEmptyBody(createUserRequest);

        await this.validateClass<CreateUserRequest>(CreateUserRequest, createUserRequest);

        return UserMapper.mapperUserFromCreateRequest(createUserRequest);
    }
}
