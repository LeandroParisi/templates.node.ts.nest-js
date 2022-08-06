import { mock } from "jest-mock-extended";

import { DeleteUserByIdDatabaseGateway } from "../../../../src/gateways/database/user/delete.user.by.id.database.gateway";
import { LoggerLogGateway } from "../../../../src/gateways/logger/logger.log.gateway";
import { DeleteUserByIdUseCase } from "../../../../src/use-cases/user/delete.user.by.id.usecase";
import { FindUserByIdUserUseCase } from "../../../../src/use-cases/user/find.user.by.id.usecase";

describe("Tests of DeleteUserByEmailUseCase", () => {
    it("Should delete user with success", async () => {
        const id = 1;

        const mockedFindUserByIdUserUseCase = mock<FindUserByIdUserUseCase>();

        const deleteUserByIdDatabaseGatewayMocked = mock<DeleteUserByIdDatabaseGateway>();

        const mockedLoggerLogGateway = mock<LoggerLogGateway>();

        const deleteUserByIdUseCase = new DeleteUserByIdUseCase(
            deleteUserByIdDatabaseGatewayMocked,
            mockedLoggerLogGateway,
            mockedFindUserByIdUserUseCase
        );

        await deleteUserByIdUseCase.deleteById(id);

        expect(mockedFindUserByIdUserUseCase.findById).toBeCalledWith(id);
        expect(deleteUserByIdDatabaseGatewayMocked.deleteById).toBeCalledWith(id);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "DeleteUserByIdUseCase",
            meta: { id },
            method: "deleteById",
        });
    });
});
