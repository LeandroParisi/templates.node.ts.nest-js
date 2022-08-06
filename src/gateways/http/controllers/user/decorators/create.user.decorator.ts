import { Post, applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiBody } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";

import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";

import { CreateUserRequestJson } from "../json/create.user.request.json";

export function CreateUserDecorator() {
    return applyDecorators(
        Post(),
        ApiResponse({ status: 201 }),
        ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
        ApiResponse({ status: 422, type: EmailAlreadyExistsBusinessException }),
        ApiBody({ type: CreateUserRequestJson })
    );
}
