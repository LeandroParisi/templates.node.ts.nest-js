import { User } from "@domain/user";

import { CreateUserRequest } from "../../json";

export class UserMapper {
    public static mapperUserFromCreateRequest(createUserRequest: CreateUserRequest): User {
        return User.builder()
            .email(createUserRequest.email)
            .firstName(createUserRequest.firstName)
            .lastName(createUserRequest.lastName)
            .password(createUserRequest.password)
            .build();
    }
}
