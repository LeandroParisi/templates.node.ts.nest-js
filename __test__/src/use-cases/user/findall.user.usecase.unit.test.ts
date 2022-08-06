import { mock } from "jest-mock-extended";

import { FindAllUserDatabaseGateway } from "../../../../src/gateways/database/user/findall.user.database.gateway";
import { LoggerLogGateway } from "../../../../src/gateways/logger/logger.log.gateway";
import { FindAllUserUseCase } from "../../../../src/use-cases/user/findall.user.usecase";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of FindAllUserUseCase", () => {
    const mockedFindAllUserDatabaseGateway = mock<FindAllUserDatabaseGateway>();
    const mockedLoggerLogGateway = mock<LoggerLogGateway>();

    it("Should be recovered a user list", async () => {
        const users = UserDataBuilder.createdUser.buildList(3);

        mockedFindAllUserDatabaseGateway.findAll.calledWith().mockResolvedValue(users);

        const findAllUserUseCase = new FindAllUserUseCase(
            mockedFindAllUserDatabaseGateway,
            mockedLoggerLogGateway
        );

        const usersResponse = await findAllUserUseCase.findAll();

        expect(usersResponse).toBe(users);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "FindAllUserUseCase",
            method: "findAll",
        });
    });
});
