import { DataSource } from "typeorm";
import { Weather } from "./weather.entity";

export const weatherProvider = {
    provide: `WEATHER`,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Weather),
    inject: [`DATA_SOURCE`],
}
