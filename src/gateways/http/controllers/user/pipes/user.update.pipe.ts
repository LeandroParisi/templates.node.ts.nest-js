import { Injectable, PipeTransform } from "@nestjs/common";

import { User } from "@domain/user";

import { RequestValidationBase } from "@common/pipes/request.validation.base";

import { UpdateUserRequest } from "../json/update.user.request";
import { UserMapper } from "./mappers/user.mapper";

@Injectable()
export class UserUpdatePipe
    extends RequestValidationBase
    implements PipeTransform<UpdateUserRequest, Promise<User>>
{
    async transform(updateUserRequest: UpdateUserRequest) {
        this.checkEmptyBody(updateUserRequest);

        await this.validateClass<UpdateUserRequest>(UpdateUserRequest, updateUserRequest);

        return UserMapper.mapperUserFromUpdateRequest(updateUserRequest);
    }
}
