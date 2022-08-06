import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";

import { CryptoGateway } from "./crypto/crypto.gateway";
import { DecryptionGateway } from "./decryption.gateway";
import { EncryptionGateway } from "./encryption.gateway";

@Module({
    imports: [EnvironmentConfigModule, PassportModule],
    providers: [
        {
            provide: EncryptionGateway,
            useClass: CryptoGateway,
        },
        {
            provide: DecryptionGateway,
            useClass: CryptoGateway,
        },
    ],
    exports: [DecryptionGateway, EncryptionGateway],
})
export class EncryptionGatewayModule {}
