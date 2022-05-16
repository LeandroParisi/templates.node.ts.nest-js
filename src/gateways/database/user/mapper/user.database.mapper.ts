import { User } from "@domain/user";

import { UserEntity } from "../../data/user.entity";

export class UserDatabaseMapper {
    public static mapperUserEntityFromUser(user: User): UserEntity {
        return UserEntity.builder()
            .email(user.email)
            .firstName(user.firstName)
            .id(user.id)
            .lastName(user.lastName)
            .password(user.password)
            .build();
    }
}
