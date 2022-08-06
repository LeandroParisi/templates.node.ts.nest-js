export interface EncryptionGateway {
    encrypt(value: string): Promise<string>;
}

export const EncryptionGatewayKey = Symbol("EncryptionGateway");
