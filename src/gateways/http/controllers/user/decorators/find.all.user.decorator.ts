import { Get, UseGuards } from "@nestjs/common";
import { applyDecorators, CacheKey, CacheTTL, UseInterceptors } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";

import { JwtAuthGuard } from "../../common/guards/jwt.auth.guard";
import { ResponseMapperInterceptor } from "../../common/interceptors/response.mapper.interceptor";
import { FindAllResponseJson } from "../json/find.all.response.json";

export function FindAllUserDecorator() {
    return applyDecorators(
        Get(),
        ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
        ApiResponse({ status: 200, type: FindAllResponseJson, isArray: true }),
        CacheKey(process.env.CACHE_USERS_KEY),
        CacheTTL(Number(process.env.CACHE_USERS_TTL)),
        UseInterceptors(new ResponseMapperInterceptor(FindAllResponseJson)),
        UseGuards(JwtAuthGuard)
    );
}
