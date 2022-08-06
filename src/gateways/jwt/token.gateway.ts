import { JwtPayload } from "./jwt.payload";

export interface TokenGateway {
    createAccessToken(jwtPayload: JwtPayload): string;
}

export const TokenGateway = Symbol("TokenGateway");
