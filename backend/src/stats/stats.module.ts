import { Module } from "@nestjs/common";
import { StatsController } from "./stats.controller";
import { providers } from "src/app.providers";

@Module({
    controllers: [
        StatsController
    ],
    providers: [
        ...providers,
    ],
})

export class StatsModule { }