import { DataSource } from "typeorm"
import { userProvider } from "./typeorm/user/user.providers";
import { queryProvider } from "./typeorm/query/query.providers";
import { weatherProvider } from "./typeorm/weather/weather.providers";

export const providers = [
    {
        provide: `DATA_SOURCE`,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: `mysql`,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [
                    `${__dirname}/**/*.entity{.ts,.js}`,
                ],
                synchronize: false,
            });
            return dataSource.initialize();
        }
    },
    userProvider,
    queryProvider,
    weatherProvider,
]