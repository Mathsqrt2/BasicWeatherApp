import {
    Column, Entity, Generated,
    PrimaryGeneratedColumn, Timestamp
} from "typeorm";

@Entity(`queries`)
export class Query {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    ip: string;

    @Generated()
    unixTime: Timestamp;

    @Column()
    timestamp: number;

}