import { mock, mockReset } from "jest-mock-extended";

import { CreateUserDatabaseGateway } from "../../../../src/gateways/database/user/interfaces/crate.user.database.gateway";
import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { LoggerWarnGateway } from "../../../../src/gateways/logger/interfaces/logger.warn.gateway";
import { EmailAlreadyExistsBusinessException } from "../../../../src/use-cases/exceptions/email.already.register.business.exception";
import { CreateUserUseCase } from "../../../../src/use-cases/user/create.user.usecase";
import { FindUserByEmailUseCase } from "../../../../src/use-cases/user/find.user.by.email.usecase";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of CreateUserUseCase", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockReset(mockedFindUserByEmailUseCase);
    });

    const mockedLoggerLogGateway = mock<LoggerLogGateway>();
    const mockedLoggerWarnGateway = mock<LoggerWarnGateway>();
    const mockedCreateUserDatabaseGateway = mock<CreateUserDatabaseGateway>();
    const mockedFindUserByEmailUseCase = mock<FindUserByEmailUseCase>();

    it("Should create user with success", async () => {
        const userToCreate = UserDataBuilder.createdUser.build();

        mockedFindUserByEmailUseCase.find
            .calledWith(userToCreate.email)
            .mockResolvedValue(undefined);

        const createUserUseCase = new CreateUserUseCase(
            mockedCreateUserDatabaseGateway,
            mockedLoggerLogGateway,
            mockedLoggerWarnGateway,
            mockedFindUserByEmailUseCase
        );

        await createUserUseCase.create(userToCreate);

        expect(mockedCreateUserDatabaseGateway.create).toBeCalledWith(userToCreate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith(userToCreate, "CREATE USER USE CASE");
    });

    it("Should create user with error user Already exists", async () => {
        const userToCreate = UserDataBuilder.createdUser.build();
        const userFinded = UserDataBuilder.fullUser.build();

        mockedFindUserByEmailUseCase.find
            .calledWith(userToCreate.email)
            .mockResolvedValue(userFinded);

        const createUserUseCase = new CreateUserUseCase(
            mockedCreateUserDatabaseGateway,
            mockedLoggerLogGateway,
            mockedLoggerWarnGateway,
            mockedFindUserByEmailUseCase
        );

        await expect(createUserUseCase.create(userToCreate)).rejects.toBeInstanceOf(
            EmailAlreadyExistsBusinessException
        );

        expect(mockedLoggerWarnGateway.warn).toBeCalledWith(
            userToCreate.email,
            "EMAIL ALREADY REGISTER"
        );
    });
});
