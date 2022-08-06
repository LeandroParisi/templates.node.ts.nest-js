import faker from "@faker-js/faker";
import * as factory from "factory.ts";

import { User } from "../../../src/domain/user";

export const fullUser = factory.Sync.makeFactory<User>({
    email: factory.each(() => faker.internet.email()),
    firstName: factory.each(() => faker.name.firstName()),
    id: factory.each(() => faker.datatype.number()),
    lastName: factory.each(() => faker.name.lastName()),
    password: factory.each(() => faker.internet.password()),
});

export const createdUser = factory.Sync.makeFactory<User>({
    email: factory.each(() => faker.internet.email()),
    firstName: factory.each(() => faker.name.firstName()),
    id: factory.each(() => faker.datatype.number()),
    lastName: factory.each(() => faker.name.lastName()),
    password: factory.each(() => faker.internet.password()),
});

export const userToCreate = factory.Sync.makeFactory<User>({
    email: factory.each(() => faker.internet.email()),
    firstName: factory.each(() => faker.name.firstName()),
    id: undefined,
    lastName: factory.each(() => faker.name.lastName()),
    password: factory.each(() => faker.internet.password()),
});
