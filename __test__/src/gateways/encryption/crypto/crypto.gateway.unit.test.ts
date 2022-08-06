import { mock, mockReset } from "jest-mock-extended";

import { EnvironmentConfigService } from "../../../../../src/common/environment/app.configuration.service";
import { CryptoGateway } from "../../../../../src/gateways/encryption/crypto/crypto.gateway";
import { DecryptionGatewayException } from "../../../../../src/gateways/encryption/exceptions/decryption.gateway.exception";
import { EncryptionGatewayException } from "../../../../../src/gateways/encryption/exceptions/encryption.gateway.exception";

describe("Tests of CryptoGateway", () => {
    const encryptionPassword = "anyEncryptionPassword";
    const encryptionIV = "ff5ac19190424b1d88f9419ef949ae56";
    const valueToEncrypt = "anyValue";

    const environmentConfigServiceMocked = mock<EnvironmentConfigService>();

    let cryptoGateway: CryptoGateway;

    beforeEach(() => {
        mockReset(environmentConfigServiceMocked);

        cryptoGateway = new CryptoGateway(environmentConfigServiceMocked);
    });

    it("Should be encrypted the value with success", async () => {
        environmentConfigServiceMocked.getEncryptionPassword
            .calledWith()
            .mockReturnValue(encryptionPassword);

        environmentConfigServiceMocked.getEncryptionIV.calledWith().mockReturnValue(encryptionIV);

        const encryptedValue = await cryptoGateway.encrypt(valueToEncrypt);

        expect(encryptedValue).toBeTruthy();
    });

    it("Should be encrypted value with error iv invalid", async () => {
        environmentConfigServiceMocked.getEncryptionPassword
            .calledWith()
            .mockReturnValue(encryptionPassword);

        environmentConfigServiceMocked.getEncryptionIV.calledWith().mockReturnValue("");

        await expect(cryptoGateway.encrypt(valueToEncrypt)).rejects.toBeInstanceOf(
            EncryptionGatewayException
        );
    });

    it("Should be decrypted the value with success", async () => {
        environmentConfigServiceMocked.getEncryptionPassword
            .calledWith()
            .mockReturnValue(encryptionPassword);

        environmentConfigServiceMocked.getEncryptionIV.calledWith().mockReturnValue(encryptionIV);

        const encryptedValue = await cryptoGateway.encrypt(valueToEncrypt);

        const decryptedValue = await cryptoGateway.decrypt(encryptedValue);

        expect(decryptedValue).toEqual(valueToEncrypt);
    });

    it("Should be decrypted value with error iv invalid", async () => {
        environmentConfigServiceMocked.getEncryptionPassword
            .calledWith()
            .mockReturnValue(encryptionPassword);

        environmentConfigServiceMocked.getEncryptionIV.calledWith().mockReturnValue("");

        await expect(cryptoGateway.decrypt("any")).rejects.toBeInstanceOf(
            DecryptionGatewayException
        );
    });
});
