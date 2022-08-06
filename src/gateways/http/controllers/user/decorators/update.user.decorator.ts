import { Put, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiBody } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";

import { JwtAuthGuard } from "../../common/guards/jwt.auth.guard";
import { UpdateUserRequestJson } from "../json/update.user.request.json";

export function UpdateUserDecorator() {
    return applyDecorators(
        Put(),
        ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
        ApiResponse({ status: 200 }),
        ApiBody({ type: UpdateUserRequestJson }),
        UseGuards(JwtAuthGuard)
    );
}
