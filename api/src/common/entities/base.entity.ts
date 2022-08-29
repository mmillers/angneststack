import { PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {

    constructor(code: number) {
        this.code = code;
    }

    @PrimaryGeneratedColumn()
    code: number;
}
