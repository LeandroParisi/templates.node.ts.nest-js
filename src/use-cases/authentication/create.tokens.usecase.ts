import { Injectable, Inject } from "@nestjs/common";

import { EncryptionGateway } from "@gateways/encryption/encryption.gateway";
import { JwtPayload } from "@gateways/jwt/jwt.payload";
import { RefreshTokenGateway } from "@gateways/jwt/refresh.gateway.token";
import { TokenGateway } from "@gateways/jwt/token.gateway";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

@Injectable()
export class CreateTokensUseCase {
    constructor(
        @Inject(TokenGateway) private readonly tokenGateway: TokenGateway,
        @Inject(RefreshTokenGateway) private readonly refreshTokenGateway: RefreshTokenGateway,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway,
        @Inject(EncryptionGateway)
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
