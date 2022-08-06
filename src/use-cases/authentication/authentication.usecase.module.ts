import { Module } from "@nestjs/common";

import { EncryptionGatewayModule } from "@gateways/encryption/encryption.gateway.module";
import { JwtModule } from "@gateways/jwt/jwt.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { UserUseCaseModule } from "../user/user.usecase.module";
import { AuthenticationUseCase } from "./authentication.usecase";
import { CreateTokensUseCase } from "./create.tokens.usecase";

@Module({
    imports: [UserUseCaseModule, LoggerModule, JwtModule, EncryptionGatewayModule],
    providers: [AuthenticationUseCase, CreateTokensUseCase],
    exports: [AuthenticationUseCase, CreateTokensUseCase],
})
export class AuthenticationUseCaseModule {}
