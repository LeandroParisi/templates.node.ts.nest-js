export interface EncryptionGateway {
    encrypt(value: string): Promise<string>;
}

export const EncryptionGateway = Symbol("EncryptionGateway");
