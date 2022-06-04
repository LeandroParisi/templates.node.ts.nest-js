import { mock, anyObject } from "jest-mock-extended";
import { Repository, InsertResult } from "typeorm";

import { LoggerService } from "../../../../src/configs/logger/logger.service";
import { UserEntity } from "../../../../src/gateways/database/data/user.entity";
import { UserDatabaseGatewayImpl } from "../../../../src/gateways/database/user/user.database.gateway.impl";
import { UserDatabaseGatewayException } from "../../../../src/gateways/exceptions/user.database.gateway.exception";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of UserDatabaseGatewayImpl", () => {
    it("Should create user with success", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        const userRepositoryMocked = mock<Repository<UserEntity>>();
        userRepositoryMocked.insert.calledWith(userToCreate).mockResolvedValue(new InsertResult());

        const mockedLoggerService = mock<LoggerService>();

        const userDatabaseGatewayImpl = new UserDatabaseGatewayImpl(
            userRepositoryMocked,
            mockedLoggerService
        );

        await userDatabaseGatewayImpl.create(userToCreate);

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);

        expect(mockedLoggerService.log).toBeCalledWith("CREATE USER DATABASE", userToCreate);
    });

    it("Should create user with database error", async () => {
        const userToCreate = UserDataBuilder.userToCreate.build();

        const userRepositoryMocked = mock<Repository<UserEntity>>();
        userRepositoryMocked.insert
            .calledWith(anyObject(UserEntity))
            .mockRejectedValue(new Error());

        const mockedLoggerService = mock<LoggerService>();

        const userDatabaseGatewayImpl = new UserDatabaseGatewayImpl(
            userRepositoryMocked,
            mockedLoggerService
        );

        await expect(userDatabaseGatewayImpl.create(userToCreate)).rejects.toBeInstanceOf(
            UserDatabaseGatewayException
        );

        expect(userRepositoryMocked.insert).toBeCalledWith(userToCreate);
    });
});
