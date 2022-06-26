import { mock, mockClear } from "jest-mock-extended";

import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { CreateUserUseCase } from "../../../../src/use-cases/user/create.user.usecase";
import { FindAllUserUseCase } from "../../../../src/use-cases/user/findall.user.usecase";
import { UserFacade } from "../../../../src/use-cases/user/user.facade";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of UserFacade", () => {
    const mockedCreateUserUseCase = mock<CreateUserUseCase>();
    const mockedLoggerLogGateway = mock<LoggerLogGateway>();
    const mockedFindAllUserUseCase = mock<FindAllUserUseCase>();

    beforeEach(() => {
        mockClear(mockedCreateUserUseCase);
        mockClear(mockedLoggerLogGateway);
        mockClear(mockedFindAllUserUseCase);
    });

    it("Should be created a user with success", async () => {
        const userToCreate = UserDataBuilder.createdUser.build();

        mockedCreateUserUseCase.create.calledWith(userToCreate).mockResolvedValue();

        await new UserFacade(
            mockedFindAllUserUseCase,
            mockedCreateUserUseCase,
            mockedLoggerLogGateway
        ).create(userToCreate);

        expect(mockedCreateUserUseCase.create).toBeCalledWith(userToCreate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserFacade",
            meta: userToCreate,
            method: "create",
        });
    });

    it("Should be recovered a user list", async () => {
        const users = UserDataBuilder.createdUser.buildList(3);

        mockedFindAllUserUseCase.findAll.calledWith().mockResolvedValue(users);

        const useFacade = new UserFacade(
            mockedFindAllUserUseCase,
            mockedCreateUserUseCase,
            mockedLoggerLogGateway
        );

        const usersResponse = await useFacade.findAll();

        expect(usersResponse).toBe(users);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserFacade",
            method: "findAll",
        });
    });
});
