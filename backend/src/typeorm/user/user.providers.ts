import { DataSource } from "typeorm";
import { User } from "./user.entity";

export const userProvider = {
    provide: `USER`,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [`DATA_SOURCE`],
}
