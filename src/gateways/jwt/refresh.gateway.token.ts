import { JwtPayload } from "./jwt.payload";

export interface RefreshTokenGateway {
    createRefreshToken(jwtPayload: JwtPayload): string;
}

export const RefreshTokenGatewayKey = Symbol("RefreshTokenGateway");
