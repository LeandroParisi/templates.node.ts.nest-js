import { mock, mockReset, anyObject } from "jest-mock-extended";

import { EncryptionGateway } from "../../../../src/gateways/encryption/encryption.gateway";
import { JwtPayload } from "../../../../src/gateways/jwt/jwt.payload";
import { RefreshTokenGateway } from "../../../../src/gateways/jwt/refresh.gateway.token";
import { TokenGateway } from "../../../../src/gateways/jwt/token.gateway";
import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { CreateTokensUseCase } from "../../../../src/use-cases/authentication/create.tokens.usecase";

describe("Tests of CreateTokensUseCase", () => {
    const userEmail = "anyEmail";
    const userId = 10;

    const accessTokenResponse = "anyAccessToken";
    const refreshTokenResponse = "anyRefreshToken";

    const emailEncrypted = "anyEmailEncrypted";
    const idEncrypted = "anyIdEncrypted";

    const encryptionGatewayMocked = mock<EncryptionGateway>();
    const tokenMocked = mock<TokenGateway>();
    const refreshTokenMocked = mock<RefreshTokenGateway>();
    const loggerLogGatewayMocked = mock<LoggerLogGateway>();

    let createTokensUseCase: CreateTokensUseCase;

    const jwtPayload = JwtPayload.builder().email(emailEncrypted).id(idEncrypted).build();

    beforeEach(() => {
        mockReset(encryptionGatewayMocked);
        mockReset(tokenMocked);
        mockReset(refreshTokenMocked);
        mockReset(loggerLogGatewayMocked);

        createTokensUseCase = new CreateTokensUseCase(
            tokenMocked,
            refreshTokenMocked,
            loggerLogGatewayMocked,
            encryptionGatewayMocked
        );
    });

    it("Should be created with success", async () => {
        encryptionGatewayMocked.encrypt.calledWith(userEmail).mockResolvedValue(emailEncrypted);
        encryptionGatewayMocked.encrypt.calledWith(String(userId)).mockResolvedValue(idEncrypted);

        tokenMocked.createAccessToken.calledWith(anyObject()).mockReturnValue(accessTokenResponse);

        refreshTokenMocked.createRefreshToken
            .calledWith(anyObject())
            .mockReturnValue(refreshTokenResponse);

        const tokensResponse = await createTokensUseCase.create(userId, userEmail);

        expect(tokensResponse.accessToken).toEqual(accessTokenResponse);
        expect(tokensResponse.refreshToken).toEqual(refreshTokenResponse);

        expect(tokenMocked.createAccessToken).toBeCalledWith(jwtPayload);

        expect(refreshTokenMocked.createRefreshToken).toBeCalledWith(jwtPayload);

        expect(loggerLogGatewayMocked.log).toBeCalledWith({
            class: CreateTokensUseCase.name,
            method: "create",
            meta: { userEmail, userId },
        });
    });
});
