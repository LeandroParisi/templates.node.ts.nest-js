import { mock, mockReset } from "jest-mock-extended";

import { User } from "../../../../src/domain/user";
import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { AuthenticationUseCase } from "../../../../src/use-cases/authentication/authentication.usecase";
import { CreateTokensUseCase } from "../../../../src/use-cases/authentication/create.tokens.usecase";
import { IncorrectCredentialsBusinessException } from "../../../../src/use-cases/authentication/exceptions/incorrect.credentials.business.exception";
import { FindUserByEmailUseCase } from "../../../../src/use-cases/user/find.user.by.email.usecase";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of AuthenticationUseCase", () => {
    const findUserByEmailUseCaseMocked = mock<FindUserByEmailUseCase>();
    const createTokensUseCase = mock<CreateTokensUseCase>();
    const loggerLogGatewayMocked = mock<LoggerLogGateway>();

    let authenticationUseCase: AuthenticationUseCase;

    const password = "anyPassword";
    const email = "anyEmail";

    const user = UserDataBuilder.fullUser.build({ password, email });

    const accessToken = "anyAccessToken";
    const refreshToken = "anyRefreshToken";

    const userResponseExpected = User.builder()
        .accessToken(accessToken)
        .email(user.email)
        .firstName(user.firstName)
        .id(user.id)
        .lastName(user.lastName)
        .refreshToken(refreshToken)
        .build();

    beforeEach(() => {
        mockReset(findUserByEmailUseCaseMocked);
        mockReset(createTokensUseCase);
        mockReset(loggerLogGatewayMocked);

        authenticationUseCase = new AuthenticationUseCase(
            findUserByEmailUseCaseMocked,
            createTokensUseCase,
            loggerLogGatewayMocked
        );
    });

    it("Should be authenticated the user with success", async () => {
        findUserByEmailUseCaseMocked.find.calledWith(email).mockResolvedValue(user);
        createTokensUseCase.create
            .calledWith(Number(user.id), user.email)
            .mockResolvedValue({ accessToken, refreshToken });

        const userResponse = await authenticationUseCase.authenticate(password, email);

        expect(userResponse).toEqual(userResponseExpected);

        expect(loggerLogGatewayMocked.log).toBeCalledWith({
            class: AuthenticationUseCase.name,
            method: "authenticate",
            meta: { email },
        });
    });

    it("Should be not authenticated the user because user was not found", async () => {
        findUserByEmailUseCaseMocked.find.calledWith(email).mockResolvedValue(null);

        await expect(authenticationUseCase.authenticate(password, email)).rejects.toBeInstanceOf(
            IncorrectCredentialsBusinessException
        );
    });

    it("Should be not authenticated the user because password is wrong", async () => {
        const user = UserDataBuilder.fullUser.build({ password: "any", email });

        findUserByEmailUseCaseMocked.find.calledWith(email).mockResolvedValue(user);

        await expect(authenticationUseCase.authenticate(password, email)).rejects.toBeInstanceOf(
            IncorrectCredentialsBusinessException
        );
    });
});
