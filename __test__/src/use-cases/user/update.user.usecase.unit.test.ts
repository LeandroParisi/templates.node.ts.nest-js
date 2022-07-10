import { mock } from "jest-mock-extended";

import { UpdateUserDatabaseGateway } from "../../../../src/gateways/database/user/update.user.database.gateway";
import { LoggerLogGateway } from "../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { UpdateUserUseCase } from "../../../../src/use-cases/user/update.user.usecase";
import { UserDataBuilder } from "../../../data-builders/domains/index";

describe("Tests of UpdateUserUseCase", () => {
    it("Should be update user with success", async () => {
        const userToUpdate = UserDataBuilder.fullUser.build();

        const mockedUpdateUserDatabaseGateway = mock<UpdateUserDatabaseGateway>();
        mockedUpdateUserDatabaseGateway.update.calledWith(userToUpdate).mockResolvedValue();

        const mockedLoggerLogGateway = mock<LoggerLogGateway>();

        const updateUserUseCase = new UpdateUserUseCase(
            mockedUpdateUserDatabaseGateway,
            mockedLoggerLogGateway
        );

        await updateUserUseCase.update(userToUpdate);

        expect(mockedUpdateUserDatabaseGateway.update).toBeCalledWith(userToUpdate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UpdateUserUseCase",
            meta: userToUpdate,
            method: "update",
        });
    });
});
