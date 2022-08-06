import { mock, anyObject, mockReset } from "jest-mock-extended";
import { Repository, InsertResult } from "typeorm";

import { User } from "../../../../../src/domain/user";
import { UserEntity } from "../../../../../src/gateways/database/data/user.entity";
import { UserDatabaseGatewayException } from "../../../../../src/gateways/database/exceptions/user.database.gateway.exception";
import { UserDatabaseGateway } from "../../../../../src/gateways/database/user/postgres/user.database.gateway";
import { LoggerErrorGateway } from "../../../../../src/gateways/logger/interfaces/logger.error.gateway";
import { LoggerLogGateway } from "../../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { UserEntityDataBuilder } from "../../../../data-builders/data/index";
import { UserDataBuilder } from "../../../../data-builders/domains/index";

describe("Tests of UserDatabaseGateway", () => {
    const mockedLoggerLogGateway = mock<LoggerLogGateway>();
    const userRepositoryMocked = mock<Repository<UserEntity>>();
    const logErrorGateway = mock<LoggerErrorGateway>();

    let userDatabaseGateway: UserDatabaseGateway;

    beforeEach(() => {
        mockReset(mockedLoggerLogGateway);
        mockReset(userRepositoryMocked);
        mockReset(logErrorGateway);

        userDatabaseGateway = new UserDatabaseGateway(
            userRepositoryMocked,
            mockedLoggerLogGateway,
            logErrorGateway
        );
    });

    it("Should be create user with success", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        userRepositoryMocked.insert.calledWith(userToCreate).mockResolvedValue(new InsertResult());

        await userDatabaseGateway.create(userToCreate);

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: userToCreate,
            method: "create",
        });
    });

    it("Should be create user with database error", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        userRepositoryMocked.insert
            .calledWith(anyObject(UserEntity))
            .mockRejectedValue(new Error());

        await expect(userDatabaseGateway.create(userToCreate)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);

        expect(logErrorGateway.error).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "create",
            meta: anyObject(),
        });
    });

    it("Should be find user by email with success", async () => {
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

        const userToFindedResponse = await userDatabaseGateway.findByEmail(email);

        expect(userToFindedResponse).toEqual(expectedUserResponse);

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ email });

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: "anyEmail",
            method: "findByEmail",
        });
    });

    it("Should be find user by email with user null", async () => {
        const email = "anyEmail";

        userRepositoryMocked.findOneBy.calledWith(anyObject()).mockResolvedValue(null);

        const userToFindedResponse = await userDatabaseGateway.findByEmail(email);

        expect(userToFindedResponse).toEqual(null);

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ email });

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: "anyEmail",
            method: "findByEmail",
        });
    });

    it("Should be find user by email with error", async () => {
        const email = "anyEmail";

        userRepositoryMocked.findOneBy.calledWith(anyObject()).mockRejectedValue(new Error());

        await expect(userDatabaseGateway.findByEmail(email)).rejects.toBeInstanceOf(
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

    it("Should be find all users with success", async () => {
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

        const userToFindedResponse = await userDatabaseGateway.findAll();

        expect(userToFindedResponse).toEqual(usersResponseExpected);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "findAll",
        });
    });

    it("Should be find all users with error", async () => {
        userRepositoryMocked.find.calledWith().mockRejectedValue(new Error());

        await expect(userDatabaseGateway.findAll()).rejects.toBeInstanceOf(
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

    it("Should be update user with success", async () => {
        const userToUpdate = UserDataBuilder.fullUser.build();

        await userDatabaseGateway.update(userToUpdate);

        expect(userRepositoryMocked.update).toBeCalledWith(
            {
                id: userToUpdate.id,
            },
            userToUpdate
        );

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "update",
            meta: userToUpdate,
        });
    });

    it("Should be update user with error", async () => {
        const userToUpdate = UserDataBuilder.fullUser.build();

        userRepositoryMocked.update
            .calledWith(anyObject(), anyObject(UserEntity))
            .mockRejectedValue(new Error());

        await expect(userDatabaseGateway.update(userToUpdate)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "update",
            meta: userToUpdate,
        });

        expect(logErrorGateway.error).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "update",
            meta: anyObject(),
        });
    });

    it("Should be find user by id with success", async () => {
        const userEntityToFinded = UserEntityDataBuilder.createdUser.build();
        const id = 1;

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

        const userToFindedResponse = await userDatabaseGateway.findById(id);

        expect(userToFindedResponse).toEqual(expectedUserResponse);

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ id });

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: id,
            method: "findById",
        });
    });

    it("Should be find user by id with error", async () => {
        const id = 1;

        userRepositoryMocked.findOneBy.calledWith(anyObject()).mockRejectedValue(new Error());

        await expect(userDatabaseGateway.findById(id)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ id });

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: id,
            method: "findById",
        });

        expect(logErrorGateway.error).toBeCalledWith({
            class: "UserDatabaseGateway",
            method: "findById",
            meta: anyObject(),
        });
    });

    it("Should be deleted user by id with error", async () => {
        const id = 1;

        userRepositoryMocked.delete.calledWith(anyObject()).mockRejectedValue(new Error());

        await expect(userDatabaseGateway.deleteById(id)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: id,
            method: "deleteById",
        });

        expect(logErrorGateway.error).toBeCalledWith({
            class: "UserDatabaseGateway",
            meta: anyObject(),
            method: "deleteById",
        });
    });
});
