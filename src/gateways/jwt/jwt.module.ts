import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";

import { LoggerModule } from "../logger/logger.module";
import { JwtStrategy } from "./jwt.strategy";
import { JwtPassport } from "./passport/jwt.passport";
import { RefreshTokenGatewayKey } from "./refresh.gateway.token";
import { TokenGatewayKey } from "./token.gateway";

@Module({
    imports: [
        LoggerModule,
        EnvironmentConfigModule,
        PassportModule,
        NestJwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    providers: [
        {
            provide: TokenGatewayKey,
            useClass: JwtPassport,
        },
        {
            provide: RefreshTokenGatewayKey,
            useClass: JwtPassport,
        },
        JwtStrategy,
    ],
    exports: [TokenGatewayKey, RefreshTokenGatewayKey],
})
export class JwtModule {}
