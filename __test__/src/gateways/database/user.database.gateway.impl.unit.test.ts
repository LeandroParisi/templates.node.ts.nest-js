import { mock, anyObject, MockProxy } from "jest-mock-extended";
import { Repository, InsertResult } from "typeorm";

import { User } from "../../../../src/domain/user";
import { UserEntity } from "../../../../src/gateways/database/data/user.entity";
import { UserDatabaseGatewayPostgres } from "../../../../src/gateways/database/user/postgress/user.database.gateway.postgres";
import { UserDatabaseGatewayException } from "../../../../src/gateways/exceptions/user.database.gateway.exception";
import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { UserEntityDataBuilder } from "../../../data-builders/data/index";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of UserDatabaseGatewayPostgres", () => {
    let mockedLoggerLogGateway: MockProxy<LoggerLogGateway>;
    let userRepositoryMocked: MockProxy<Repository<UserEntity>>;

    beforeEach(() => {
        mockedLoggerLogGateway = mock<LoggerLogGateway>();
        userRepositoryMocked = mock<Repository<UserEntity>>();
    });

    it("Should create user with success", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        userRepositoryMocked.insert.calledWith(userToCreate).mockResolvedValue(new InsertResult());

        const userDatabaseGatewayImpl = new UserDatabaseGatewayPostgres(
            userRepositoryMocked,
            mockedLoggerLogGateway
        );

        await userDatabaseGatewayImpl.create(userToCreate);

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith(userToCreate, "CREATE USER DATABASE");
    });

    it("Should create user with database error", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        userRepositoryMocked.insert
            .calledWith(anyObject(UserEntity))
            .mockRejectedValue(new Error());

        const userDatabaseGatewayImpl = new UserDatabaseGatewayPostgres(
            userRepositoryMocked,
            mockedLoggerLogGateway
        );

        await expect(userDatabaseGatewayImpl.create(userToCreate)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);
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

        const userDatabaseGatewayImpl = new UserDatabaseGatewayPostgres(
            userRepositoryMocked,
            mockedLoggerLogGateway
        );

        const userToFindedResponse = await userDatabaseGatewayImpl.findByEmail(email);

        expect(userToFindedResponse).toEqual(expectedUserResponse);

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ email });

        expect(mockedLoggerLogGateway.log).toBeCalledWith(email, "FIND USER BY EMAIL DATABASE");
    });

    it("Should find by email with user null", async () => {
        const email = "anyEmail";

        userRepositoryMocked.findOneBy.calledWith(anyObject()).mockResolvedValue(undefined);

        const userDatabaseGatewayImpl = new UserDatabaseGatewayPostgres(
            userRepositoryMocked,
            mockedLoggerLogGateway
        );

        const userToFindedResponse = await userDatabaseGatewayImpl.findByEmail(email);

        expect(userToFindedResponse).toEqual(null);

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ email });

        expect(mockedLoggerLogGateway.log).toBeCalledWith(email, "FIND USER BY EMAIL DATABASE");
    });

    it("Should find by email with error", async () => {
        const email = "anyEmail";

        userRepositoryMocked.findOneBy.calledWith(anyObject()).mockRejectedValue(new Error());

        const userDatabaseGatewayImpl = new UserDatabaseGatewayPostgres(
            userRepositoryMocked,
            mockedLoggerLogGateway
        );

        await expect(userDatabaseGatewayImpl.findByEmail(email)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(userRepositoryMocked.findOneBy).toBeCalledWith({ email });

        expect(mockedLoggerLogGateway.log).toBeCalledWith(email, "FIND USER BY EMAIL DATABASE");
    });
});
