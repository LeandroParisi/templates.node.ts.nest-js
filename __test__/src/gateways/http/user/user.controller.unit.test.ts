import faker from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import { when, resetAllWhenMocks } from "jest-when";

import { User } from "../../../../../src/domain/user";
import { UserDatabaseGatewayImpl } from "../../../../../src/gateways/database/user/user.database.gateway.impl";
import { CreateUserRequest } from "../../../../../src/gateways/http/controllers/user/json/create.user.request";
import { UserController } from "../../../../../src/gateways/http/controllers/user/user.controller";
import { CreateUserUseCase } from "../../../../../src/use-cases/create.user.usecase";

describe("Tests of UserController", () => {
    let userController: UserController;
    let createUserUseCase: CreateUserUseCase;

    beforeEach(async () => {
        resetAllWhenMocks();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [CreateUserUseCase, UserDatabaseGatewayImpl],
        }).compile();

        userController = module.get<UserController>(UserController);
        createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    });

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

        const mockedCreate = jest.spyOn(createUserUseCase, "create");
        when(mockedCreate).calledWith(userToCreate).mockResolvedValue();

        await userController.create(createUserRequest);

        expect(mockedCreate).toBeCalledWith(userToCreate);
    });
});
