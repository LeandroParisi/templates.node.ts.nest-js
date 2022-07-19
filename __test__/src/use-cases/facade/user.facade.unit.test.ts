import { mock, mockClear } from "jest-mock-extended";

import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { UserFacade } from "../../../../src/use-cases/facade/user.facade";
import { CreateUserUseCase } from "../../../../src/use-cases/user/create.user.usecase";
import { DeleteUserByIdUseCase } from "../../../../src/use-cases/user/delete.user.by.id.usecase";
import { FindUserByIdUserUseCase } from "../../../../src/use-cases/user/find.user.by.id.usecase";
import { FindAllUserUseCase } from "../../../../src/use-cases/user/findall.user.usecase";
import { UpdateUserUseCase } from "../../../../src/use-cases/user/update.user.usecase";
import { UserDataBuilder } from "../../../data-builders/domains";

describe("Tests of UserFacade", () => {
    const mockedCreateUserUseCase = mock<CreateUserUseCase>();
    const mockedLoggerLogGateway = mock<LoggerLogGateway>();
    const mockedFindAllUserUseCase = mock<FindAllUserUseCase>();
    const mockedUpdateUserUseCase = mock<UpdateUserUseCase>();
    const mockedFindUserByIdUserUseCase = mock<FindUserByIdUserUseCase>();
    const mockedDeleteUserByIdUseCase = mock<DeleteUserByIdUseCase>();

    let userFacade: UserFacade;

    beforeEach(() => {
        mockClear(mockedCreateUserUseCase);
        mockClear(mockedLoggerLogGateway);
        mockClear(mockedFindAllUserUseCase);
        mockClear(mockedUpdateUserUseCase);

        userFacade = new UserFacade(
            mockedFindAllUserUseCase,
            mockedCreateUserUseCase,
            mockedUpdateUserUseCase,
            mockedFindUserByIdUserUseCase,
            mockedDeleteUserByIdUseCase,
            mockedLoggerLogGateway
        );
    });

    it("Should be created a user with success", async () => {
        const userToCreate = UserDataBuilder.createdUser.build();

        mockedCreateUserUseCase.create.calledWith(userToCreate).mockResolvedValue();

        await userFacade.create(userToCreate);

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

        const usersResponse = await userFacade.findAll();

        expect(usersResponse).toBe(users);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserFacade",
            method: "findAll",
        });
    });

    it("Should be update a user list", async () => {
        const userToUpdate = UserDataBuilder.fullUser.build();

        mockedUpdateUserUseCase.update.calledWith(userToUpdate).mockResolvedValue();

        await userFacade.update(userToUpdate);

        expect(mockedUpdateUserUseCase.update).toBeCalledWith(userToUpdate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserFacade",
            method: "update",
            meta: userToUpdate,
        });
    });

    it("Should be finded user by id", async () => {
        const user = UserDataBuilder.fullUser.build();
        const id = 1;

        mockedFindUserByIdUserUseCase.findById.calledWith(1).mockResolvedValue(user);

        const userResponse = await userFacade.findById(id);

        expect(userResponse).toEqual(user);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserFacade",
            method: "findById",
            meta: { id },
        });
    });

    it("Should be deleted user by id", async () => {
        const id = 1;

        mockedDeleteUserByIdUseCase.deleteById.calledWith(1).mockResolvedValue();

        await userFacade.deleteById(id);

        expect(mockedDeleteUserByIdUseCase.deleteById).toBeCalledWith(id);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserFacade",
            method: "deleteById",
            meta: { id },
        });
    });
});
