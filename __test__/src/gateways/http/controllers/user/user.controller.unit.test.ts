import faker from "@faker-js/faker";
import { mock, mockReset } from "jest-mock-extended";

import { User } from "../../../../../../src/domain/user";
import { CreateUserRequestJson } from "../../../../../../src/gateways/http/controllers/user/json/create.user.request.json";
import { UserController } from "../../../../../../src/gateways/http/controllers/user/user.controller";
import { UserFacade } from "../../../../../../src/use-cases/facade/user.facade";
import { UserDataBuilder } from "../../../../../data-builders/domains/index";

describe("Tests of UserController", () => {
    const mockedUserFacade = mock<UserFacade>();

    let userController: UserController;

    beforeEach(() => {
        mockReset(mockedUserFacade);

        userController = new UserController(mockedUserFacade);
    });

    it("should be crated a user", async () => {
        const createUserRequest: CreateUserRequestJson = {
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

        mockedUserFacade.create.calledWith(userToCreate).mockResolvedValue();

        await userController.create(createUserRequest);

        expect(mockedUserFacade.create).toBeCalledWith(userToCreate);
    });

    it("should be recovered a user list", async () => {
        const users = UserDataBuilder.fullUser.buildList(2);

        mockedUserFacade.findAll.calledWith().mockResolvedValue(users);

        const usersResponse = await userController.findAll();

        expect(usersResponse).toEqual(users);
    });

    it("should by update user", async () => {
        const userToUpdate = UserDataBuilder.fullUser.build();

        mockedUserFacade.update.calledWith(userToUpdate).mockResolvedValue();

        await userController.update(userToUpdate);

        expect(mockedUserFacade.update).toBeCalledWith(userToUpdate);
    });
});
