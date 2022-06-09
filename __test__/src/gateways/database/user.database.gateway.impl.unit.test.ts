import { mock, anyObject } from "jest-mock-extended";
import { Repository, InsertResult } from "typeorm";

import { UserEntity } from "../../../../src/gateways/database/data/user.entity";
import { UserDatabaseGatewayImpl } from "../../../../src/gateways/database/user/user.database.gateway.impl";
import { UserDatabaseGatewayException } from "../../../../src/gateways/exceptions/user.database.gateway.exception";
import { LoggerLogGateway } from "../../../../src/gateways/logger/logger.log.gateway";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of UserDatabaseGatewayImpl", () => {
    const mockedLoggerLogGateway = mock<LoggerLogGateway>();
    const userRepositoryMocked = mock<Repository<UserEntity>>();

    it("Should create user with success", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        userRepositoryMocked.insert.calledWith(userToCreate).mockResolvedValue(new InsertResult());

        const userDatabaseGatewayImpl = new UserDatabaseGatewayImpl(
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

        const userDatabaseGatewayImpl = new UserDatabaseGatewayImpl(
            userRepositoryMocked,
            mockedLoggerLogGateway
        );

        await expect(userDatabaseGatewayImpl.create(userToCreate)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);
    });
});
