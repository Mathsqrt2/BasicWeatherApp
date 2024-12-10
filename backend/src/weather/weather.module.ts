import { Module } from "@nestjs/common";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";
import { providers } from "src/app.providers";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [WeatherController],
    providers: [WeatherService, ...providers],
})

export class WeatherModule { }