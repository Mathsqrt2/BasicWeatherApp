import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}