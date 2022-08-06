import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";

import { LoggerModule } from "../logger/logger.module";
import { JwtStrategy } from "./jwt.strategy";
import { JwtPassport } from "./passport/jwt.passport";
import { RefreshTokenGateway } from "./refresh.gateway.token";
import { TokenGateway } from "./token.gateway";

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
            provide: TokenGateway,
            useClass: JwtPassport,
        },
        {
            provide: RefreshTokenGateway,
            useClass: JwtPassport,
        },
        JwtStrategy,
    ],
    exports: [TokenGateway, RefreshTokenGateway],
})
export class JwtModule {}
