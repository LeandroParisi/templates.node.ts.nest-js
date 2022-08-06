import { Delete, UseGuards } from "@nestjs/common";
import { applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiParam } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";

import { UserNotFoundBusinessException } from "@use-cases/exceptions/user.not.found.business.exception";

import { JwtAuthGuard } from "../../guards/jwt.auth.guard";

export function DeleteUserDecorator() {
    return applyDecorators(
        Delete(":id"),
        ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
        ApiResponse({ status: 400, type: UserNotFoundBusinessException }),
        ApiResponse({ status: 200 }),
        ApiParam({ name: "id", type: "number", required: true }),
        UseGuards(JwtAuthGuard)
    );
}
