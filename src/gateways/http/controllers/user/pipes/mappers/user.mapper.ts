import { User } from "@domain/user";

import { CreateUserRequest, UpdateUserRequest } from "../../json";

export class UserMapper {
    public static mapperUserFromCreateRequest(createUserRequest: CreateUserRequest): User {
        return User.builder()
            .email(createUserRequest.email)
            .firstName(createUserRequest.firstName)
            .lastName(createUserRequest.lastName)
            .password(createUserRequest.password)
            .build();
    }

    public static mapperUserFromUpdateRequest(updateUserRequest: UpdateUserRequest): User {
        return User.builder()
            .email(updateUserRequest.email)
            .id(updateUserRequest.id)
            .firstName(updateUserRequest.firstName)
            .lastName(updateUserRequest.lastName)
            .password(updateUserRequest.password)
            .build();
    }
}
