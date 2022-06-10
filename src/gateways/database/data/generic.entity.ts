import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class GenericEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    public id: number;

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
}
