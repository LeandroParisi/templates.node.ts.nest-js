import { Controller, Post, Body, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody, ApiCreatedResponse } from "@nestjs/swagger";

import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { DecryptionGatewayException } from "@gateways/encryption/exceptions/decryption.gateway.exception";
import { EncryptionGatewayException } from "@gateways/encryption/exceptions/encryption.gateway.exception";
import { JWTGatewayException } from "@gateways/jwt/exceptions/jwt.gateway.exception";

import { IncorrectCredentialsBusinessException } from "@use-cases/authentication/exceptions/incorrect.credentials.business.exception";
import { AuthenticationFacade } from "@use-cases/facade/authentication.facade";

import { User } from "@domain/user";

import { RequestLoggerInterceptor } from "../interceptors/request.logger.interceptor";
import { ResponseAuthMapperInterceptor } from "./interceptors/response.auth.mapper.interceptor";
import { AuthenticationResponseJson, AuthenticationRequestJson } from "./json";

@Controller("auth")
@ApiTags("Authentication")
@UseInterceptors(RequestLoggerInterceptor)
export class AuthenticationController {
    constructor(private readonly authenticationFacade: AuthenticationFacade) {}

    @Post("login")
    @ApiResponse({
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
    })
    @ApiResponse({ status: 422, type: IncorrectCredentialsBusinessException })
    @ApiCreatedResponse({
        type: AuthenticationResponseJson,
        headers: {
            ACCESS_TOKEN: { description: "Access token", schema: { type: "string" } },
            REFRESH_TOKEN: { description: "Refresh token", schema: { type: "string" } },
        },
    })
    @ApiBody({ type: AuthenticationRequestJson })
    @UseInterceptors(ResponseAuthMapperInterceptor)
    public async create(
        @Body(ValidationPipe) authenticationRequestJson: AuthenticationRequestJson
    ): Promise<User> {
        const userAuthenticated = await this.authenticationFacade.authenticate(
            authenticationRequestJson.password,
            authenticationRequestJson.email
        );

        return userAuthenticated;
    }
}
