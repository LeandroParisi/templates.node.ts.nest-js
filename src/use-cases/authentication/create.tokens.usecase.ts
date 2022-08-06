import { Injectable, Inject } from "@nestjs/common";

import { EncryptionGatewayKey, EncryptionGateway } from "@gateways/encryption/encryption.gateway";
import { JwtPayload } from "@gateways/jwt/jwt.payload";
import { RefreshTokenGatewayKey, RefreshTokenGateway } from "@gateways/jwt/refresh.gateway.token";
import { TokenGatewayKey, TokenGateway } from "@gateways/jwt/token.gateway";
import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

@Injectable()
export class CreateTokensUseCase {
    constructor(
        @Inject(TokenGatewayKey) private readonly tokenGateway: TokenGateway,
        @Inject(RefreshTokenGatewayKey) private readonly refreshTokenGateway: RefreshTokenGateway,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway,
        @Inject(EncryptionGatewayKey)
        private readonly encryptionGateway: EncryptionGateway
    ) {}

    public async create(userId: number, userEmail: string) {
        this.loggerLogGateway.log({
            class: CreateTokensUseCase.name,
            method: "create",
            meta: { userEmail, userId },
        });

        const [emailEncrypted, idEncrypted] = await Promise.all([
            this.encryptionGateway.encrypt(userEmail),
            this.encryptionGateway.encrypt(String(userId)),
        ]);

        const jwtPayload = JwtPayload.builder().email(emailEncrypted).id(idEncrypted).build();

        const [accessToken, refreshToken] = await Promise.all([
            this.tokenGateway.createAccessToken(jwtPayload),
            this.refreshTokenGateway.createRefreshToken(jwtPayload),
        ]);

        return { accessToken, refreshToken };
    }
}
