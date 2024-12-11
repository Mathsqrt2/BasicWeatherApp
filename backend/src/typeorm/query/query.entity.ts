import {
    Column, Entity, Generated,
    JoinColumn, ManyToOne,
    PrimaryGeneratedColumn, Timestamp
} from "typeorm";
import { Weather } from "../weather/weather.entity";

@Entity(`queries`)
export class Query {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    ip: string;

    @Column({ nullable: true })
    weather_id: number;

    @ManyToOne(() => Weather, weather => weather.requests)
    @JoinColumn({ name: `weather_id` })
    assignedWeather: Weather

    @Generated()
    unixTime: Timestamp;

    @Column()
    timestamp: number;

}