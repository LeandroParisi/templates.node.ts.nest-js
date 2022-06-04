import faker from "@faker-js/faker";
import { mock } from "jest-mock-extended";

import { LoggerService } from "../../../../../src/configs/logger/logger.service";
import { User } from "../../../../../src/domain/user";
import { CreateUserRequest } from "../../../../../src/gateways/http/controllers/user/json/create.user.request";
import { UserController } from "../../../../../src/gateways/http/controllers/user/user.controller";
import { UserFacade } from "../../../../../src/use-cases/user/user.facade";

describe("Tests of UserController", () => {
    it("should be defined", async () => {
        const createUserRequest: CreateUserRequest = {
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.internet.password(),
        };

        const userToCreate = User.builder()
            .email(createUserRequest.email)
            .firstName(createUserRequest.firstName)
            .id(undefined)
            .lastName(createUserRequest.lastName)
            .password(createUserRequest.password)
            .build();

        const mockedUserFacade = mock<UserFacade>();
        mockedUserFacade.create.calledWith(userToCreate).mockResolvedValue();

        const mockedLoggerService = mock<LoggerService>();

        const userController = new UserController(mockedUserFacade, mockedLoggerService);

        await userController.create(createUserRequest);

        expect(mockedUserFacade.create).toBeCalledWith(userToCreate);
        expect(mockedLoggerService.log).toBeCalledWith("CREATE USER CONTROLLER", createUserRequest);
    });
});
