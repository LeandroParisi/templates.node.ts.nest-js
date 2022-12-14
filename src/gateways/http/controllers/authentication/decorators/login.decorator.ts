import { Post, UseInterceptors, applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiCreatedResponse, ApiBody } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { DecryptionGatewayException } from "@gateways/encryption/exceptions/decryption.gateway.exception";
import { EncryptionGatewayException } from "@gateways/encryption/exceptions/encryption.gateway.exception";
import { JWTGatewayException } from "@gateways/jwt/exceptions/jwt.gateway.exception";

import { IncorrectCredentialsBusinessException } from "@use-cases/authentication/exceptions/incorrect.credentials.business.exception";

import { ResponseAuthMapperInterceptor } from "../interceptors/response.auth.mapper.interceptor";
import { AuthenticationRequestJson } from "../json/authentication.request.json";
import { AuthenticationResponseJson } from "../json/authentication.response.json";

export function LoginDecorator() {
    return applyDecorators(
        Post("login"),
        ApiResponse({
            status: 500,
            content: {
                "application/json": {
                    examples: {
                        UserDatabaseGatewayException: { value: new UserDatabaseGatewayException() },
                        JWTGatewayException: { value: new JWTGatewayException() },
                        DecryptionGatewayException: { value: new DecryptionGatewayException() },
                        EncryptionGatewayException: { value: new EncryptionGatewayException() },
                    },
                },
            },
        }),
        ApiResponse({ status: 422, type: IncorrectCredentialsBusinessException }),
        ApiCreatedResponse({
            type: AuthenticationResponseJson,
            headers: {
                ACCESS_TOKEN: { description: "Access token", schema: { type: "string" } },
                REFRESH_TOKEN: { description: "Refresh token", schema: { type: "string" } },
            },
        }),
        ApiBody({ type: AuthenticationRequestJson }),
        UseInterceptors(ResponseAuthMapperInterceptor)
    );
}
