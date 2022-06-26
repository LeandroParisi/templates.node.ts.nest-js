import faker from "@faker-js/faker";
import { mock } from "jest-mock-extended";

import { User } from "../../../../../src/domain/user";
import { CreateUserRequest } from "../../../../../src/gateways/http/controllers/user/json/create.user.request";
import { FindAllResponse } from "../../../../../src/gateways/http/controllers/user/json/find.all.response";
import { UserController } from "../../../../../src/gateways/http/controllers/user/user.controller";
import { LoggerLogGateway } from "../../../../../src/gateways/logger/interfaces/logger.log.gateway";
import { UserFacade } from "../../../../../src/use-cases/user/user.facade";
import { UserDataBuilder } from "../../../../data-builders/domains/index";

describe("Tests of UserController", () => {
    it("should be crated a user", async () => {
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

        const mockedLoggerLogGateway = mock<LoggerLogGateway>();

        const userController = new UserController(mockedUserFacade, mockedLoggerLogGateway);

        await userController.create(createUserRequest);

        expect(mockedUserFacade.create).toBeCalledWith(userToCreate);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserController",
            meta: userToCreate,
            method: "create",
        });
    });

    it("should be recovered a user list", async () => {
        const users = UserDataBuilder.fullUser.buildList(2);

        const expectedUsersResponse = users.map((user) => {
            return FindAllResponse.builder()
                .email(user.email)
                .firstName(user.firstName)
                .id(user.id)
                .lastName(user.lastName)
                .build();
        });

        const mockedUserFacade = mock<UserFacade>();
        mockedUserFacade.findAll.calledWith().mockResolvedValue(users);

        const mockedLoggerLogGateway = mock<LoggerLogGateway>();

        const userController = new UserController(mockedUserFacade, mockedLoggerLogGateway);

        const usersResponse = await userController.findAll();

        expect(usersResponse).toEqual(expectedUsersResponse);

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "UserController",
            method: "findAll",
        });
    });
});
