import { mock } from "jest-mock-extended";

import { LoggerService } from "../../../../src/configs/logger/logger.service";
import { CreateUserDatabaseGateway } from "../../../../src/gateways/database/user/crate.user.database.gateway";
import { EmailAlreadyExistsBusinessException } from "../../../../src/use-cases/exceptions/email.already.register.business.exception";
import { CreateUserUseCase } from "../../../../src/use-cases/user/create.user.usecase";
import { FindUserByEmailUseCase } from "../../../../src/use-cases/user/find.user.by.email.usecase";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of CreateUserUseCase", () => {
    it("Should create user with success", async () => {
        const userToCreate = UserDataBuilder.createdUser.build();

        const mockedFindUserByEmailUseCase = mock<FindUserByEmailUseCase>();
        mockedFindUserByEmailUseCase.find
            .calledWith(userToCreate.email)
            .mockResolvedValue(undefined);

        const mockedCreateUserDatabaseGateway = mock<CreateUserDatabaseGateway>();

        const mockedLoggerService = mock<LoggerService>();

        const createUserUseCase = new CreateUserUseCase(
            mockedCreateUserDatabaseGateway,
            mockedFindUserByEmailUseCase,
            mockedLoggerService
        );

        await createUserUseCase.create(userToCreate);

        expect(mockedCreateUserDatabaseGateway.create).toBeCalledWith(userToCreate);

        expect(mockedLoggerService.log).toBeCalledWith("CREATE USER USE CASE", userToCreate);
    });

    it("Should create user with error user Already exists", async () => {
        const userToCreate = UserDataBuilder.createdUser.build();
        const userFinded = UserDataBuilder.fullUser.build();

        const mockedFindUserByEmailUseCase = mock<FindUserByEmailUseCase>();
        mockedFindUserByEmailUseCase.find
            .calledWith(userToCreate.email)
            .mockResolvedValue(userFinded);

        const mockedCreateUserDatabaseGateway = mock<CreateUserDatabaseGateway>();

        const mockedLoggerService = mock<LoggerService>();

        const createUserUseCase = new CreateUserUseCase(
            mockedCreateUserDatabaseGateway,
            mockedFindUserByEmailUseCase,
            mockedLoggerService
        );

        let exception: EmailAlreadyExistsBusinessException;

        try {
            await createUserUseCase.create(userToCreate);
        } catch (error) {
            exception = error;
        }

        expect(exception.code).toEqual("open.finance.error.business.email.already.register");
        expect(exception.message).toEqual("Email Already register.");
        expect(exception.statusCode).toEqual(422);

        expect(mockedLoggerService.warn).toBeCalledWith(
            "EMAIL ALREADY REGISTER",
            userToCreate.email
        );
    });
});
