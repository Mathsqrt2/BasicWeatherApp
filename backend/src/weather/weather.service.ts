import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Request } from "express";
import { Query } from "src/typeorm/query/query.entity";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios"
import { first, firstValueFrom } from "rxjs";
import { CoordsResponse, WeatherReport, WeatherResponse } from "./weather.types";
import { Weather } from "src/typeorm/weather/weather.entity";

@Injectable()

export class WeatherService {

    constructor(
        @Inject(`QUERY`) private readonly query: Repository<Query>,
        @Inject(`WEATHER`) private readonly weather: Repository<Weather>,
        private readonly http: HttpService,
    ) { }

    private findCoordsByName = async (city: string): Promise<[number, number]> => {

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPEN_WEAHTER_API_KEY}`;
        let response: CoordsResponse;

        try {
            response = await firstValueFrom<any>(this.http.get(url).pipe(first()));
        } catch (err) {
            console.error(err.message);
            throw new InternalServerErrorException(`Failed to receive coords.`);
        }

        return [response.data[0].lat, response.data[0].lon];

    }

    private findWeatherByCords = async (latitude: number, longitude: number): Promise<WeatherResponse> => {

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEAHTER_API_KEY}`;
        let response;

        try {
            response = await firstValueFrom<any>(this.http.get(url).pipe(first()));
            console.log(response.data)
        } catch (err) {
            console.error(err.message);
            throw new InternalServerErrorException(`Failed to receive weather.`);
        }

        return response as WeatherResponse;
    }

    private formatWeatherResponse = (res: WeatherResponse): WeatherReport => {
        return
    }

    public findCurrentWeatherFor = async (city: string, req: Request): Promise<WeatherReport> => {

        let query = await this.query.save({ city, ip: req.ip, timestamp: Date.now() });
        let latitude, longitude;

        try {

            [latitude, longitude] = await this.findCoordsByName(city);

        } catch (err) {
            throw new InternalServerErrorException(err);
        }

        let currentWeather;
        try {
            currentWeather = this.findWeatherByCords(latitude, longitude);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }

        const weatherReport = this.formatWeatherResponse(currentWeather);
        this.weather.save({ ...weatherReport, timestamp: Date.now() });

        return weatherReport;
    }

}