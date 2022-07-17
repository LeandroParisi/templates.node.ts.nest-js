import { mock, mockClear } from "jest-mock-extended";

import { FindUserByIdDatabaseGateway } from "../../../../src/gateways/database/user/find.user.by.id.database.gateway";
import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { UserNotFoundBusinessException } from "../../../../src/use-cases/exceptions/user.not.found.business.execption";
import { FindUserByIdUserUseCase } from "../../../../src/use-cases/user/find.user.by.id.usecase";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of FindUserByIdDatabaseGateway", () => {
    const mockedFindUserByIdDatabaseGateway = mock<FindUserByIdDatabaseGateway>();
    const mockedLoggerLogGateway = mock<LoggerLogGateway>();

    let findUserByIdUserUseCase: FindUserByIdUserUseCase;

    beforeEach(() => {
        mockClear(mockedFindUserByIdDatabaseGateway);
        mockClear(mockedFindUserByIdDatabaseGateway);

        findUserByIdUserUseCase = new FindUserByIdUserUseCase(
            mockedFindUserByIdDatabaseGateway,
            mockedLoggerLogGateway
        );
    });

    it("Should be find user by id with success", async () => {
        const user = UserDataBuilder.fullUser.build();
        const id = 1;

        mockedFindUserByIdDatabaseGateway.findById.calledWith(id).mockResolvedValue(user);

        const userResponse = await findUserByIdUserUseCase.findById(id);

        expect(userResponse).toBe(user);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "FindUserByIdUserUseCase",
            method: "findById",
            meta: id,
        });
    });

    it("Should be find user by id with error user not found", async () => {
        const id = 2;

        mockedFindUserByIdDatabaseGateway.findById.calledWith(id).mockResolvedValue(null);

        await expect(findUserByIdUserUseCase.findById(id)).rejects.toBeInstanceOf(
            UserNotFoundBusinessException
        );

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "FindUserByIdUserUseCase",
            method: "findById",
            meta: id,
        });
    });
});
