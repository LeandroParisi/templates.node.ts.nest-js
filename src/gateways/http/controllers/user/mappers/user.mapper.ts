import { User } from "@domain/user";

import { FindAllResponse } from "../json/find.all.response";

export class UserMapper {
    public static mapperUserToFindAllResponse(users: User[]): FindAllResponse[] {
        return users.map((user) => {
            return FindAllResponse.builder()
                .email(user.email)
                .firstName(user.firstName)
                .id(user.id)
                .lastName(user.lastName)
                .build();
        });
    }
}
