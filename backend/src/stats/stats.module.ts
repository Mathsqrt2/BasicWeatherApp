import { Module } from "@nestjs/common";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { providers } from "src/app.providers";

@Module({
    imports: [],
    controllers: [
        StatsController
    ],
    providers: [
        StatsService,
        ...providers,
    ],
})

export class StatsModule { }