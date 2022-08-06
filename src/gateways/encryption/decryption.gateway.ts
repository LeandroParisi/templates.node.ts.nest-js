export interface DecryptionGateway {
    decrypt(valueEncrypted: string): Promise<string>;
}

export const DecryptionGateway = Symbol("DecryptionGateway");
