import { mock } from "jest-mock-extended";

import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { CreateUserUseCase } from "../../../../src/use-cases/user/create.user.usecase";
import { UserFacade } from "../../../../src/use-cases/user/user.facade";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of UserFacade", () => {
    it("Should create user with success", async () => {
        const userToCreate = UserDataBuilder.createdUser.build();

        const mockedCreateUserUseCase = mock<CreateUserUseCase>();
        mockedCreateUserUseCase.create.calledWith(userToCreate).mockResolvedValue();

        const mockedLoggerLogGateway = mock<LoggerLogGateway>();

        await new UserFacade(mockedCreateUserUseCase, mockedLoggerLogGateway).create(userToCreate);

        expect(mockedCreateUserUseCase.create).toBeCalledWith(userToCreate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserFacade",
            meta: userToCreate,
            method: "create",
        });
    });
});
