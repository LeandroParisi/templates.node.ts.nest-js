import faker from "@faker-js/faker";
import { INestApplication, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";
import * as request from "supertest";
import { Repository, EntityNotFoundError } from "typeorm";

import { UserEntity } from "../../../src/gateways/database/data/user.entity";
import { CreateUserRequestJson } from "../../../src/gateways/http/controllers/user/json/create.user.request.json";
import { FindAllResponseJson } from "../../../src/gateways/http/controllers/user/json/find.all.response.json";
import { FindByIdResponseJson } from "../../../src/gateways/http/controllers/user/json/find.by.id.response.json";
import { UpdateUserRequestJson } from "../../../src/gateways/http/controllers/user/json/update.user.request.json";
import { UserEntityDataBuilder } from "../../data-builders/data/index";
import {
    startTestServer,
    crateUserToUseOnTests,
    deleteAllUsersBeforeTests,
    authenticate,
} from "../utils";

describe("Tests e2e UserController", () => {
    let server: INestApplication;
    let userRepository: Repository<UserEntity>;

    beforeAll(async () => {
        server = await startTestServer();
        userRepository = server.get("UserEntityRepository");

        await server.init();
    });

    afterAll(async () => {
        await server.close();
    });

    describe("Should be executed tests to create user", () => {
        beforeEach(async () => {
            await deleteAllUsersBeforeTests(userRepository);
        });

        it("Should create user with success", async () => {
            const createUserRequest = CreateUserRequestJson.builder()
                .email(faker.internet.email())
                .firstName(faker.name.firstName())
                .lastName(faker.name.lastName())
                .password(faker.internet.password(8))
                .build();

            await request(server.getHttpServer()).post("/user").send(createUserRequest).expect(201);

            const userCreate = await userRepository.findOne({
                where: { email: createUserRequest.email },
            });

            expect(userCreate).toBeTruthy();
        });

        it("Should create user with error user already exists", async () => {
            const createUserRequest = CreateUserRequestJson.builder()
                .email(faker.internet.email())
                .firstName(faker.name.firstName())
                .lastName(faker.name.lastName())
                .password(faker.internet.password(8))
                .build();

            await request(server.getHttpServer()).post("/user").send(createUserRequest).expect(201);

            const response = await request(server.getHttpServer())
                .post("/user")
                .send(createUserRequest)
                .expect(422);

            expect(response.statusCode).toEqual(422);
        });
    });

    describe("Should be executed tests to find all users", () => {
        let cache: Cache;

        const userEntities = UserEntityDataBuilder.create.buildList(3);

        let expectedUsersResponse: FindAllResponseJson[];

        let accessToken = "";

        beforeAll(async () => {
            cache = server.get(CACHE_MANAGER);

            await deleteAllUsersBeforeTests(userRepository);

            const usersSaved = await crateUserToUseOnTests(userRepository, userEntities);

            const userToAuthenticate = usersSaved[0];

            accessToken = await authenticate(userToAuthenticate.email, userToAuthenticate.password);

            expectedUsersResponse = usersSaved.map((userEntity) => {
                return FindAllResponseJson.builder()
                    .email(userEntity.email)
                    .firstName(userEntity.firstName)
                    .id(userEntity.id)
                    .lastName(userEntity.lastName)
                    .build();
            });
        });

        it("Should find all users with success", async () => {
            cache.del(process.env.CACHE_USERS_KEY || "");

            const response = await request(server.getHttpServer())
                .get("/user")
                .set("Authorization", `Bearer ${accessToken}`)
                .send()
                .expect(200);

            expect(response.body).toEqual(expectedUsersResponse);
        });

        it("Should find all users with cache", async () => {
            const response = await request(server.getHttpServer())
                .get("/user")
                .set("Authorization", `Bearer ${accessToken}`)
                .send()
                .expect(200);

            expect(response.body).toEqual(expectedUsersResponse);
        });
    });

    describe("Should be executed tests to update user", () => {
        const userEntities = UserEntityDataBuilder.create.buildList(1);

        let usersSaved: UserEntity[];

        let accessToken = "";

        beforeAll(async () => {
            await deleteAllUsersBeforeTests(userRepository);

            usersSaved = await crateUserToUseOnTests(userRepository, userEntities);

            const userToAuthenticate = usersSaved[0];

            accessToken = await authenticate(userToAuthenticate.email, userToAuthenticate.password);
        });

        it("Should update user with success", async () => {
            const userToUpdate = UpdateUserRequestJson.builder()
                .email(usersSaved[0].email)
                .firstName(usersSaved[0].firstName)
                .lastName(faker.name.findName())
                .password(usersSaved[0].password)
                .id(usersSaved[0].id || 0)
                .build();

            await request(server.getHttpServer())
                .put("/user")
                .set("Authorization", `Bearer ${accessToken}`)
                .send(userToUpdate)
                .expect(200);

            const userToUpdateFinded = await userRepository.findOne({
                where: { id: userToUpdate.id },
            });

            expect(userToUpdateFinded?.id).toEqual(userToUpdate.id);
            expect(userToUpdateFinded?.firstName).toEqual(userToUpdate.firstName);
            expect(userToUpdateFinded?.lastName).toEqual(userToUpdate.lastName);
            expect(userToUpdateFinded?.email).toEqual(userToUpdate.email);
            expect(userToUpdateFinded?.password).toEqual(userToUpdate.password);
        });
    });

    describe("Should be executed tests to find user by id", () => {
        const userEntities = UserEntityDataBuilder.create.buildList(3);

        let findByIdResponseJsonExpected: FindByIdResponseJson;

        let accessToken = "";

        beforeAll(async () => {
            await deleteAllUsersBeforeTests(userRepository);

            const usersSaved = await crateUserToUseOnTests(userRepository, userEntities);

            const userToAuthenticate = usersSaved[0];

            accessToken = await authenticate(userToAuthenticate.email, userToAuthenticate.password);

            findByIdResponseJsonExpected = FindAllResponseJson.builder()
                .email(usersSaved[0].email)
                .firstName(usersSaved[0].firstName)
                .id(usersSaved[0].id)
                .lastName(usersSaved[0].lastName)
                .build();
        });

        it("Should be finded user by id with success", async () => {
            const response = await request(server.getHttpServer())
                .get(`/user/${findByIdResponseJsonExpected.id}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send()
                .expect(200);

            expect(response.body).toEqual(findByIdResponseJsonExpected);
        });

        it("Should be finded user by id with error user not found", async () => {
            const response = await request(server.getHttpServer())
                .get("/user/0")
                .set("Authorization", `Bearer ${accessToken}`)
                .send();

            expect(response.statusCode).toEqual(404);
        });
    });

    describe("Should be executed tests to delete user by id", () => {
        const userEntities = UserEntityDataBuilder.create.buildList(3);

        let userEntityToDelete: UserEntity;

        let accessToken = "";

        beforeAll(async () => {
            await deleteAllUsersBeforeTests(userRepository);

            const usersSaved = await crateUserToUseOnTests(userRepository, userEntities);
            userEntityToDelete = usersSaved[0];

            const userToAuthenticate = usersSaved[1];

            accessToken = await authenticate(userToAuthenticate.email, userToAuthenticate.password);
        });

        it("Should be deleted user by id with success", async () => {
            await request(server.getHttpServer())
                .delete(`/user/${userEntityToDelete.id}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send()
                .expect(200);

            await expect(
                userRepository.findOneByOrFail({
                    id: userEntityToDelete.id,
                })
            ).rejects.toBeInstanceOf(EntityNotFoundError);
        });
    });
});
