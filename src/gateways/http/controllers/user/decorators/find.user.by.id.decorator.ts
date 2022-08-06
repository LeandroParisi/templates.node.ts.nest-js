import { Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiParam } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";

import { UserNotFoundBusinessException } from "@use-cases/exceptions/user.not.found.business.exception";

import { JwtAuthGuard } from "../../guards/jwt.auth.guard";
import { ResponseMapperInterceptor } from "../../interceptors/response.mapper.interceptor";
import { FindByIdResponseJson } from "../json/find.by.id.response.json";

export function FindUserByIdDecorator() {
    return applyDecorators(
        Get(":id"),
        ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
        ApiResponse({ status: 400, type: UserNotFoundBusinessException }),
        ApiResponse({ status: 200, type: FindByIdResponseJson }),
        ApiParam({ name: "id", type: "number", required: true }),
        UseInterceptors(new ResponseMapperInterceptor(FindByIdResponseJson)),
        UseGuards(JwtAuthGuard)
    );
}
