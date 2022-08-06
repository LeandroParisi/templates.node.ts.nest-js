import faker from "@faker-js/faker";
import { mock, mockReset } from "jest-mock-extended";

import { AuthenticationController } from "../../../../../../src/gateways/http/controllers/authentication/authentication.controller";
import { AuthenticationRequestJson } from "../../../../../../src/gateways/http/controllers/authentication/json/authentication.request.json";
import { AuthenticationFacade } from "../../../../../../src/use-cases/facade/authentication.facade";
import { UserDataBuilder } from "../../../../../data-builders/domains/index";

describe("Tests of AuthenticationController", () => {
    const password = faker.internet.password();
    const email = faker.internet.email();

    const user = UserDataBuilder.fullUser.build();

    const mockedAuthenticationFacade = mock<AuthenticationFacade>();

    let authenticationController: AuthenticationController;

    beforeEach(() => {
        mockReset(mockedAuthenticationFacade);

        authenticationController = new AuthenticationController(mockedAuthenticationFacade);
    });

    it("Should be logged user with success", async () => {
        mockedAuthenticationFacade.authenticate.calledWith(password, email).mockResolvedValue(user);

        const userResponse = await authenticationController.login(
            AuthenticationRequestJson.builder().email(email).password(password).build()
        );

        expect(userResponse).toEqual(user);
    });
});
