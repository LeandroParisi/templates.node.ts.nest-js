import { mock, mockReset } from "jest-mock-extended";

import { LoggerLogGateway } from "../../../../src/gateways/logger/logger.log.gateway";
import { AuthenticationUseCase } from "../../../../src/use-cases/authentication/authentication.usecase";
import { AuthenticationFacade } from "../../../../src/use-cases/facade/authentication.facade";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of AuthenticationFacade", () => {
    const authenticationUseCaseMocked = mock<AuthenticationUseCase>();
    const loggerLogGatewayMocked = mock<LoggerLogGateway>();

    let authenticationFacade: AuthenticationFacade;

    const email = "anyEmail";
    const password = "anyPassword";

    const user = UserDataBuilder.fullUser.build();

    beforeEach(() => {
        mockReset(authenticationUseCaseMocked);
        mockReset(loggerLogGatewayMocked);

        authenticationFacade = new AuthenticationFacade(
            authenticationUseCaseMocked,
            loggerLogGatewayMocked
        );
    });

    it("Should by authenticated user with success", async () => {
        authenticationUseCaseMocked.authenticate
            .calledWith(password, email)
            .mockResolvedValue(user);

        const userResponse = await authenticationFacade.authenticate(password, email);

        expect(userResponse).toEqual(user);

        expect(loggerLogGatewayMocked.log).toBeCalledWith({
            class: AuthenticationFacade.name,
            meta: email,
            method: "authenticate",
        });
    });
});
