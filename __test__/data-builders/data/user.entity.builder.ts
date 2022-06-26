import faker from "@faker-js/faker";
import * as factory from "factory.ts";

import { UserEntity } from "../../../src/gateways/database/data/user.entity";

export const createdUser = factory.Sync.makeFactory<UserEntity>({
    email: factory.each(() => faker.internet.email()),
    firstName: factory.each(() => faker.name.firstName()),
    id: factory.each(() => faker.datatype.number()),
    lastName: factory.each(() => faker.name.lastName()),
    password: factory.each(() => faker.internet.password()),
    createdAt: factory.each(() => faker.datatype.datetime()),
    lastUpdate: factory.each(() => faker.datatype.datetime()),
});

export const create = factory.Sync.makeFactory<UserEntity>({
    email: factory.each(() => faker.internet.email()),
    firstName: factory.each(() => faker.name.firstName()),
    lastName: factory.each(() => faker.name.lastName()),
    password: factory.each(() => faker.internet.password()),
    createdAt: factory.each(() => faker.datatype.datetime()),
    lastUpdate: factory.each(() => faker.datatype.datetime()),
});
