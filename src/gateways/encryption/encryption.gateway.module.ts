import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";

import { CryptoGateway } from "./crypto/crypto.gateway";
import { DecryptionGatewayKey } from "./decryption.gateway";
import { EncryptionGatewayKey } from "./encryption.gateway";

@Module({
    imports: [EnvironmentConfigModule, PassportModule],
    providers: [
        {
            provide: EncryptionGatewayKey,
            useClass: CryptoGateway,
        },
        {
            provide: DecryptionGatewayKey,
            useClass: CryptoGateway,
        },
    ],
    exports: [DecryptionGatewayKey, EncryptionGatewayKey],
})
export class EncryptionGatewayModule {}
