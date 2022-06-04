import { mock } from "jest-mock-extended";

import { LoggerService } from "../../../../src/configs/logger/logger.service";
import { CreateUserUseCase } from "../../../../src/use-cases/user/create.user.usecase";
import { UserFacade } from "../../../../src/use-cases/user/user.facade";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of UserFacade", () => {
    it("Should create user with success", async () => {
        const userToCreate = UserDataBuilder.createdUser.build();

        const mockedCreateUserUseCase = mock<CreateUserUseCase>();
        mockedCreateUserUseCase.create.calledWith(userToCreate).mockResolvedValue();

        const mockedLoggerService = mock<LoggerService>();

        await new UserFacade(mockedCreateUserUseCase, mockedLoggerService).create(userToCreate);

        expect(mockedCreateUserUseCase.create).toBeCalledWith(userToCreate);

        expect(mockedLoggerService.log).toBeCalledWith("CREATE USER FACADE", userToCreate);
    });
});
