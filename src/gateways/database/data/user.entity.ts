import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { Builder, IBuilder } from "@utils/builder";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    public id: number;

    @Column("varchar", { name: "first_name", length: 255, nullable: true })
    public firstName: string;

    @Column("varchar", { name: "last_name", length: 255, nullable: true })
    public lastName: string;

    @Column("varchar", { length: 255, nullable: true })
    public email: string;

    @Column("varchar", { length: 8, nullable: true })
    public password: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    public createdAt: Date;

    @UpdateDateColumn({
        name: "last_update",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    public lastUpdate: Date;

    public static builder(): IBuilder<UserEntity> {
        return Builder<UserEntity>();
    }
}
