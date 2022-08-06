import { Injectable } from "@nestjs/common";
import { createCipheriv, createDecipheriv, Cipher, scrypt, Decipher } from "crypto";
import { promisify } from "util";

import { EnvironmentConfigService } from "@common/environment/app.configuration.service";

import { DecryptionGateway } from "../decryption.gateway";
import { EncryptionGateway } from "../encryption.gateway";
import { DecryptionGatewayException } from "../exceptions/decryption.gateway.exception";
import { EncryptionGatewayException } from "../exceptions/encryption.gateway.exception";

@Injectable()
export class CryptoGateway implements EncryptionGateway, DecryptionGateway {
    constructor(private readonly environmentConfigService: EnvironmentConfigService) {}

    public async decrypt(valueEncrypted: string): Promise<string> {
        try {
            const decipher = await this.createDecipher();

            const decryptedValue = Buffer.concat([
                decipher.update(Buffer.from(valueEncrypted, "hex")),
                decipher.final(),
            ]);

            return decryptedValue.toString();
        } catch (error) {
            throw new DecryptionGatewayException(error.stack);
        }
    }

    public async encrypt(value: string): Promise<string> {
        try {
            const cipher = await this.createCipher();

            const buffer = Buffer.concat([cipher.update(value), cipher.final()]);

            return buffer.toString("hex");
        } catch (error) {
            throw new EncryptionGatewayException(error.stack);
        }
    }

    private async createDecipher(): Promise<Decipher> {
        const key = await this.getKey();

        return createDecipheriv(
            "aes-256-ctr",
            key,
            Buffer.from(this.environmentConfigService.getEncryptionIV(), "hex")
        );
    }

    private async createCipher(): Promise<Cipher> {
        const key = await this.getKey();

        return createCipheriv(
            "aes-256-ctr",
            key,
            Buffer.from(this.environmentConfigService.getEncryptionIV(), "hex")
        );
    }

    private async getKey(): Promise<Buffer> {
        return (await promisify(scrypt)(
            this.environmentConfigService.getEncryptionPassword(),
            "salt",
            32
        )) as Buffer;
    }
}
