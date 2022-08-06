import { Controller, Body, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthenticationFacade } from "@use-cases/facade/authentication.facade";

import { User } from "@domain/user";

import { RequestLoggerInterceptor } from "../interceptors/request.logger.interceptor";
import { LoginDecorator } from "./decorators";
import { AuthenticationRequestJson } from "./json";

@Controller("auth")
@ApiTags("Authentication")
@UseInterceptors(RequestLoggerInterceptor)
export class AuthenticationController {
    constructor(private readonly authenticationFacade: AuthenticationFacade) {}

    @LoginDecorator()
    public async login(
        @Body(ValidationPipe) authenticationRequestJson: AuthenticationRequestJson
    ): Promise<User> {
        const userAuthenticated = await this.authenticationFacade.authenticate(
            authenticationRequestJson.password,
            authenticationRequestJson.email
        );

        return userAuthenticated;
    }
}
