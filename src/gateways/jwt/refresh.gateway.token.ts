import { JwtPayload } from "./jwt.payload";

export interface RefreshTokenGateway {
    createRefreshToken(jwtPayload: JwtPayload): string;
}

export const RefreshTokenGateway = Symbol("RefreshTokenGateway");
