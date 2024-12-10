import {
    Column, Entity, JoinColumn,
    OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { Query } from "../query/query.entity";

@Entity(`weather`)
export class Weather {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    temperature: number;

    @Column()
    city: string;

    @Column()
    weather_conditions: string;

    @Column()
    recommended_activity: string;

    @Column()
    timestamp: number;

    @OneToMany(() => Query, query => query.assignedWeather)
    @JoinColumn()
    requests: Query[];

}