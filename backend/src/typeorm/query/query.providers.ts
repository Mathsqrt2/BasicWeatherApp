import { DataSource } from "typeorm";
import { Query } from "./query.entity";

export const queryProvider = {
    provide: `QUERY`,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Query),
    inject: [`DATA_SOURCE`],
}