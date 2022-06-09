import { mock } from "jest-mock-extended";

import { FindUserByEmailDatabaseGateway } from "../../../../src/gateways/database/user/find.user.by.email.gateway";
import { LoggerLogGateway } from "../../../../src/gateways/logger/logger.log.gateway";
import { FindUserByEmailUseCase } from "../../../../src/use-cases/user/find.user.by.email.usecase";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of FindUserByEmailUseCase", () => {
    it("Should find user with success", async () => {
        const userFinded = UserDataBuilder.fullUser.build();
        const emailToFinded = userFinded.email;

        const findUserByEmailDatabaseGatewayMocked = mock<FindUserByEmailDatabaseGateway>();
        findUserByEmailDatabaseGatewayMocked.findByEmail
            .calledWith(emailToFinded)
            .mockResolvedValue(userFinded);

        const mockedLoggerLogGateway = mock<LoggerLogGateway>();

        const findUserByEmailUseCase = new FindUserByEmailUseCase(
            findUserByEmailDatabaseGatewayMocked,
            mockedLoggerLogGateway
        );

        const userFindedResponse = await findUserByEmailUseCase.find(emailToFinded);

        expect(userFindedResponse).toBe(userFinded);

        expect(mockedLoggerLogGateway.log).toBeCalledWith(
            emailToFinded,
            "FIND USER BY EMAIL USE CASE"
        );
    });
});
