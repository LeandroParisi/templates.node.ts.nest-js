import { JwtService } from "@nestjs/jwt";
import { mock, mockReset, anyObject } from "jest-mock-extended";

import { EnvironmentConfigService } from "../../../../../src/common/environment/app.configuration.service";
import { JWTGatewayException } from "../../../../../src/gateways/jwt/exceptions/jwt.gateway.exception";
import { JwtPayload } from "../../../../../src/gateways/jwt/jwt.payload";
import { JwtPassport } from "../../../../../src/gateways/jwt/passport/jwt.passport";
import { LoggerLogGateway } from "../../../../../src/gateways/logger/logger.log.gateway";

describe("Tests of JwtPassport", () => {
    const email = "anyEmail";
    const id = 10;
    const jwtExpirationTime = 10;

    const accessToken = "anyAccessToken";
    const refreshToken = "anyRefreshToken";

    const jwtPayload = JwtPayload.builder().email(email).id(String(id)).build();

    const loggerLogGatewayMocked = mock<LoggerLogGateway>();
    const jwtServiceMocked = mock<JwtService>();
    const environmentConfigServiceMocked = mock<EnvironmentConfigService>();

    let jwtPassport: JwtPassport;

    beforeEach(() => {
        mockReset(loggerLogGatewayMocked);
        mockReset(jwtServiceMocked);
        mockReset(environmentConfigServiceMocked);

        jwtPassport = new JwtPassport(
            loggerLogGatewayMocked,
            jwtServiceMocked,
            environmentConfigServiceMocked
        );
    });

    it("Should be create access token with success", () => {
        environmentConfigServiceMocked.getJwtExpirationTime
            .calledWith()
            .mockReturnValue(jwtExpirationTime);

        jwtServiceMocked.sign.calledWith(anyObject(), anyObject()).mockReturnValue(accessToken);

        const accessTokenResponse = jwtPassport.createAccessToken(jwtPayload);

        expect(accessTokenResponse).toEqual(accessToken);

        expect(loggerLogGatewayMocked.log).toBeCalledWith({
            class: JwtPassport.name,
            meta: jwtPayload,
            method: "createAccessToken",
        });

        expect(jwtServiceMocked.sign).toBeCalledWith(
            { jwtPayload },
            {
                expiresIn: jwtExpirationTime,
            }
        );
    });

    it("Should be create access token with error", () => {
        environmentConfigServiceMocked.getJwtExpirationTime
            .calledWith()
            .mockReturnValue(jwtExpirationTime);

        jwtServiceMocked.sign.mockImplementation(() => {
            throw new Error();
        });

        const toThrow = () => {
            jwtPassport.createAccessToken(jwtPayload);
        };

        expect(toThrow).toThrowError(JWTGatewayException);
    });

    it("Should be create refresh token with success", () => {
        environmentConfigServiceMocked.getJwtRefreshTokenExpirationTime
            .calledWith()
            .mockReturnValue(jwtExpirationTime);

        jwtServiceMocked.sign.calledWith(anyObject(), anyObject()).mockReturnValue(refreshToken);

        const refreshTokenResponse = jwtPassport.createRefreshToken(jwtPayload);

        expect(refreshTokenResponse).toEqual(refreshToken);

        expect(loggerLogGatewayMocked.log).toBeCalledWith({
            class: JwtPassport.name,
            meta: jwtPayload,
            method: "createRefreshToken",
        });

        expect(jwtServiceMocked.sign).toBeCalledWith(
            { jwtPayload },
            {
                expiresIn: jwtExpirationTime,
            }
        );
    });

    it("Should be create refresh token with error", () => {
        environmentConfigServiceMocked.getJwtRefreshTokenExpirationTime
            .calledWith()
            .mockReturnValue(jwtExpirationTime);

        jwtServiceMocked.sign.mockImplementation(() => {
            throw new Error();
        });

        const toThrow = () => {
            jwtPassport.createRefreshToken(jwtPayload);
        };

        expect(toThrow).toThrowError(JWTGatewayException);
    });
});
