import faker from "@faker-js/faker";

import { UpdateUserRequestJson } from "../../../../../../../src/gateways/http/controllers/user/json/update.user.request.json";
import { UserUpdatePipe } from "../../../../../../../src/gateways/http/controllers/user/pipes/user.update.pipe";

describe("Tests of UserUpdatePipe", () => {
    it("Should return user mapped", async () => {
        const updateUserRequest = UpdateUserRequestJson.builder()
            .email(faker.internet.email())
            .firstName(faker.name.firstName())
            .lastName(faker.name.lastName())
            .password(faker.internet.password(8))
            .id(faker.datatype.number())
            .build();

        const userUpdatePipe = new UserUpdatePipe();

        const userToUpdate = await userUpdatePipe.transform(updateUserRequest);

        expect(userToUpdate).toEqual(updateUserRequest);
    });
});
