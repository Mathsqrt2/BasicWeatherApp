import {
    BadRequestException, Controller,
    Get, HttpStatus, Param, Req, Res
} from "@nestjs/common";
import { Request, Response } from "express";
import { WeatherService } from "./weather.service";

@Controller("api")

export class WeatherController {

    constructor(
        private readonly weatherService: WeatherService,
    ) { }

    @Get("weather/:city")
    async checkWeatherInCity(
        @Param('city') city: string,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<any> {

        if (!city || city.length <= 2) {
            throw new BadRequestException(`Incorrect city name`);
        }

        try {

            let response = await this.weatherService.findCurrentWeatherFor(city, req);
            res.status(HttpStatus.OK).json(response);

        } catch (err) {
            console.error(`Failed to check weather. Error: ${err.message}. ${new Date().toLocaleDateString(`pl-PL`)}`);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}