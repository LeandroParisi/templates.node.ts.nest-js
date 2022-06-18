import { Builder, IBuilder } from "builder-pattern";
import { Entity, Column } from "typeorm";

import { GenericEntity } from "./generic.entity";

@Entity("user")
export class UserEntity extends GenericEntity {
    @Column("varchar", { name: "first_name", length: 255, nullable: true })
    public firstName: string;

    @Column("varchar", { name: "last_name", length: 255, nullable: true })
    public lastName: string;

    @Column("varchar", { length: 255, nullable: true, unique: true })
    public email: string;

    @Column("varchar", { length: 8, nullable: true })
    public password: string;

    public static builder(): IBuilder<UserEntity> {
        return Builder<UserEntity>();
    }
}
