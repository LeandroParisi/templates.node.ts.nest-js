export interface DecryptionGateway {
    decrypt(valueEncrypted: string): Promise<string>;
}

export const DecryptionGatewayKey = Symbol("DecryptionGateway");
