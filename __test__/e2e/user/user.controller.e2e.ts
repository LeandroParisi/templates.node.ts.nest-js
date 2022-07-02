import faker from "@faker-js/faker";
import { INestApplication, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";
import * as request from "supertest";
import { Repository } from "typeorm";

import { UserEntity } from "../../../src/gateways/database/data/user.entity";
import { CreateUserRequest } from "../../../src/gateways/http/controllers/user/json/create.user.request";
import { FindAllResponse } from "../../../src/gateways/http/controllers/user/json/find.all.response";
import { UserEntityDataBuilder } from "../../data-builders/data/index";
import { startTestServer } from "../utils";

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
            const createUserRequest = CreateUserRequest.builder()
                .email(faker.internet.email())
                .firstName(faker.name.firstName())
                .lastName(faker.name.lastName())
                .password(faker.internet.password(8))
                .build();

            await request(server.getHttpServer())
                .post("/user/create")
                .send(createUserRequest)
                .expect(201);

            const userCreate = await userRepository.findOne({
                where: { email: createUserRequest.email },
            });

            expect(userCreate).toBeTruthy();
        });

        it("Should create user with error user already exists", async () => {
            const createUserRequest = CreateUserRequest.builder()
                .email(faker.internet.email())
                .firstName(faker.name.firstName())
                .lastName(faker.name.lastName())
                .password(faker.internet.password(8))
                .build();

            await request(server.getHttpServer())
                .post("/user/create")
                .send(createUserRequest)
                .expect(201);

            const response = await request(server.getHttpServer())
                .post("/user/create")
                .send(createUserRequest)
                .expect(422);

            expect(response.statusCode).toEqual(422);
        });
    });

    describe("Should be executed tests to find all users", () => {
        let cache: Cache;

        const userEntities = UserEntityDataBuilder.create.buildList(3);

        let expectedUsersResponse: FindAllResponse[];

        beforeAll(async () => {
            cache = server.get(CACHE_MANAGER);

            await deleteAllUsersBeforeTests(userRepository);

            expectedUsersResponse = await crateUserToUseOnTests(
                userRepository,
                userEntities,
                expectedUsersResponse
            );

            await server.init();
        });

        it("Should find all users with success", async () => {
            cache.del(process.env.CACHE_USERS_KEY || "");

            const response = await request(server.getHttpServer()).get("/user").send().expect(200);

            expect(response.body).toEqual(expectedUsersResponse);
        });

        it("Should find all users with cache", async () => {
            const response = await request(server.getHttpServer()).get("/user").send().expect(200);

            expect(response.body).toEqual(expectedUsersResponse);
        });
    });
});

async function crateUserToUseOnTests(
    userRepository: Repository<UserEntity>,
    userEntities: UserEntity[],
    expectedUsersResponse: FindAllResponse[]
) {
    const usersSaved = await userRepository.save(userEntities);

    expectedUsersResponse = usersSaved.map((userEntity) => {
        return FindAllResponse.builder()
            .email(userEntity.email)
            .firstName(userEntity.firstName)
            .id(userEntity.id)
            .lastName(userEntity.lastName)
            .build();
    });
    return expectedUsersResponse;
}

async function deleteAllUsersBeforeTests(userRepository: Repository<UserEntity>) {
    const allUsers = await userRepository.find();

    for (const user of allUsers) {
        await userRepository.remove([user]);
    }
}
