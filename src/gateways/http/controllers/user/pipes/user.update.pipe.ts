import { Injectable, PipeTransform } from "@nestjs/common";

import { RequestValidationBase } from "@gateways/http/controllers/pipes/request.validation.base";

import { User } from "@domain/user";

import { UpdateUserRequestJson } from "../json/update.user.request.json";
import { UserMapper } from "./mappers/user.mapper";

@Injectable()
export class UserUpdatePipe
    extends RequestValidationBase
    implements PipeTransform<UpdateUserRequestJson, Promise<User>>
{
    async transform(updateUserRequest: UpdateUserRequestJson) {
        this.checkEmptyBody(updateUserRequest);

        await this.validateClass<UpdateUserRequestJson>(UpdateUserRequestJson, updateUserRequest);

        return UserMapper.mapperUserFromUpdateRequest(updateUserRequest);
    }
}
