import { mock, anyObject, mockReset } from "jest-mock-extended";
import { Repository, InsertResult } from "typeorm";

import { User } from "../../../../../src/domain/user";
import { UserEntity } from "../../../../../src/gateways/database/data/user.entity";
import { UserDatabaseGateway } from "../../../../../src/gateways/database/user/postgres/user.database.gateway";
import { UserDatabaseGatewayException } from "../../../../../src/gateways/exceptions/user.database.gateway.exception";
import { LoggerErrorGateway } from "../../../../../src/gateways/logger/interfaces/logger.error.gateway";
import { LoggerLogGateway } from "../../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { UserEntityDataBuilder } from "../../../../data-builders/data/index";
import { UserDataBuilder } from "../../../../data-builders/domains/index";

describe("Tests of UserDatabaseGateway", () => {
    const mockedLoggerLogGateway = mock<LoggerLogGateway>();
    const userRepositoryMocked = mock<Repository<UserEntity>>();
    const logErrorGateway = mock<LoggerErrorGateway>();

    beforeEach(() => {
        mockReset(mockedLoggerLogGateway);
        mockReset(userRepositoryMocked);
        mockReset(logErrorGateway);
    });

    it("Should create user with success", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        userRepositoryMocked.insert.calledWith(userToCreate).mockResolvedValue(new InsertResult());

        const userDatabaseGatewayImpl = new UserDatabaseGateway(
            userRepositoryMocked,
            mockedLoggerLogGateway,
            logErrorGateway
        );

        await userDatabaseGatewayImpl.create(userToCreate);

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: userToCreate,
            method: "create",
        });
    });

    it("Should create user with database error", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        userRepositoryMocked.insert
            .calledWith(anyObject(UserEntity))
            .mockRejectedValue(new Error());

        const userDatabaseGatewayImpl = new UserDatabaseGateway(
            userRepositoryMocked,
            mockedLoggerLogGateway,
            logErrorGateway
        );

        await expect(userDatabaseGatewayImpl.create(userToCreate)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);

        expect(logErrorGateway.error).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "create",
            meta: anyObject(),
        });
    });

    it("Should find by email with success", async () => {
        const userEntityToFinded = UserEntityDataBuilder.createdUser.build();
        const email = "anyEmail";

        const expectedUserResponse = User.builder()
            .email(userEntityToFinded.email)
            .firstName(userEntityToFinded.firstName)
            .lastName(userEntityToFinded.lastName)
            .id(userEntityToFinded.id)
            .password(userEntityToFinded.password)
            .build();

        userRepositoryMocked.findOneBy
            .calledWith(anyObject())
            .mockResolvedValue(userEntityToFinded);

        const userDatabaseGatewayImpl = new UserDatabaseGateway(
            userRepositoryMocked,
            mockedLoggerLogGateway,
            logErrorGateway
        );

        const userToFindedResponse = await userDatabaseGatewayImpl.findByEmail(email);

        expect(userToFindedResponse).toEqual(expectedUserResponse);

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ email });

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: "anyEmail",
            method: "findByEmail",
        });
    });

    it("Should find by email with user null", async () => {
        const email = "anyEmail";

        userRepositoryMocked.findOneBy.calledWith(anyObject()).mockResolvedValue(null);

        const userDatabaseGatewayImpl = new UserDatabaseGateway(
            userRepositoryMocked,
            mockedLoggerLogGateway,
            logErrorGateway
        );

        const userToFindedResponse = await userDatabaseGatewayImpl.findByEmail(email);

        expect(userToFindedResponse).toEqual(null);

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ email });

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: "anyEmail",
            method: "findByEmail",
        });
    });

    it("Should find by email with error", async () => {
        const email = "anyEmail";

        userRepositoryMocked.findOneBy.calledWith(anyObject()).mockRejectedValue(new Error());

        const userDatabaseGatewayImpl = new UserDatabaseGateway(
            userRepositoryMocked,
            mockedLoggerLogGateway,
            logErrorGateway
        );

        await expect(userDatabaseGatewayImpl.findByEmail(email)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ email });

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: "anyEmail",
            method: "findByEmail",
        });

        expect(logErrorGateway.error).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "findByEmail",
            meta: anyObject(),
        });
    });

    it("Should find all user", async () => {
        const usersEntity = UserEntityDataBuilder.createdUser.buildList(2);

        const usersResponseExpected = usersEntity.map((userEntity) => {
            return User.builder()
                .email(userEntity.email)
                .firstName(userEntity.firstName)
                .lastName(userEntity.lastName)
                .id(userEntity.id)
                .password(userEntity.password)
                .build();
        });

        userRepositoryMocked.find.calledWith().mockResolvedValue(usersEntity);

        const userDatabaseGatewayImpl = new UserDatabaseGateway(
            userRepositoryMocked,
            mockedLoggerLogGateway,
            logErrorGateway
        );

        const userToFindedResponse = await userDatabaseGatewayImpl.findAll();

        expect(userToFindedResponse).toEqual(usersResponseExpected);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "findAll",
        });
    });

    it("Should find all user with database error", async () => {
        userRepositoryMocked.find.calledWith().mockRejectedValue(new Error());

        const userDatabaseGatewayImpl = new UserDatabaseGateway(
            userRepositoryMocked,
            mockedLoggerLogGateway,
            logErrorGateway
        );

        await expect(userDatabaseGatewayImpl.findAll()).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "findAll",
        });

        expect(logErrorGateway.error).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "findAll",
            meta: anyObject(),
        });
    });
});
