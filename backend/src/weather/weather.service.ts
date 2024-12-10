import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Request } from "express";
import { Query } from "src/typeorm/query/query.entity";
import { MoreThanOrEqual, Repository } from "typeorm";
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
        } catch (err) {
            console.error(err.message);
            throw new InternalServerErrorException(`Failed to receive weather.`);
        }

        return response as WeatherResponse;
    }

    private KELVIN_TO_CELSIUS_DIFFERENCE = 273.15;
    private kelvinToCelsius = (kelvinTemp: number): number => +Number(kelvinTemp - this.KELVIN_TO_CELSIUS_DIFFERENCE).toFixed(1);

    private rateTemperature = (temperature: number): number => {
        const TOO_HOT_TEMPERATURE = 28;
        const OPTIMAL_TEMPERATURE = 18;
        const TOO_COLD_TEMPERATURE = 10;
        const VERY_COLD_TEMPERATURE = 0;

        console.log(temperature);

        if (temperature >= TOO_HOT_TEMPERATURE) {
            return 4;
        }

        else if (temperature < TOO_HOT_TEMPERATURE && temperature >= OPTIMAL_TEMPERATURE) {
            return 3;
        }

        else if (temperature < OPTIMAL_TEMPERATURE && temperature >= TOO_COLD_TEMPERATURE) {
            return 2;
        }

        else if (temperature < TOO_COLD_TEMPERATURE && temperature >= VERY_COLD_TEMPERATURE) {
            return 1;
        }

        else {
            return 0;
        }

    }

    private prepareRecommendations = (res: WeatherResponse): string => {

        let isDryOutside: boolean = true;
        let temperature: number = this.kelvinToCelsius(res.data.main.feels_like);
        let response: string = ``;

        for (let condition of res.data.weather) {
            if (condition.description.includes(`rain`) || condition.description.includes(`snow`)) {
                isDryOutside = false;
            }
        }

        if (isDryOutside) {

            switch (this.rateTemperature(temperature)) {
                case 4: response = `It’s too hot. Stay indoors and visit air-conditioned places. Postpone shopping until evening.`
                    break;
                case 3: response = `The weather is perfect for a walk in the park or outdoor activities.`
                    break;
                case 2: response = `It’s a bit chilly. Dress warmly and don’t forget your hat.`
                    break;
                case 1: response = `It’s cold but dry. Consider staying indoors or in heated spaces.`
                    break;
                case 0: response = `It’s too cold. Stay home, dress warmly, and move carefully due to ice. Try indoor board games.`
                    break;
            }

        } else {

            switch (this.rateTemperature(temperature)) {
                case 4: response = `It’s too hot with high humidity. Stay in air-conditioned places.`
                    break;
                case 3: response = `The temperature is fine, but humidity is high. Check out local cinema or theater, or seek sheltered buildings.`
                    break;
                case 2: response = `The temperature is mild. Perfect for a light jacket and outdoor stroll.`
                    break;
                case 1: response = `It’s cold, but not freezing. Dress warmly and stay comfortable outdoors.`
                    break;
                case 0: response = `It’s freezing. Stay indoors, and if you must go out, bundle up and take extra caution.`
                    break;
            }

        }

        return response;
    }

    private recognizeImportantConditions = (res: WeatherResponse): string => {

        let temperature: number = this.kelvinToCelsius(res.data.main.feels_like);
        let response: string = ``;

        for (let condition of res.data.weather) {
            if (condition.description.includes(`rain`)) {
                response += `It’s raining.`;
            }

            if (condition.description.includes(`snow`)) {
                response += `It’s snowing.`;
            }

            if (condition.description.includes(`cloudy`)) {
                response += `It’s cloudy. (clouds: ${res.data.clouds})`;
            }

            if (condition.description.includes(`clean`)) {
                response += `It’s sunny.`;
            }

        }

        response += ` Current atmospheric pressure: ${res.data.main.pressure} (hPa).`

        switch (this.rateTemperature(temperature)) {
            case 4: response += ` The temperature is too high. ${temperature}°C`
                break;
            case 3: response += ` The temperature is optimal. ${temperature}°C`
                break;
            case 2: response += ` It’s chilly but bearable. ${temperature}°C`
                break;
            case 1: response += ` It’s cold. ${temperature}°C`
                break;
            case 0: response += ` It’s very cold. ${temperature}°C`
                break;
        }

        return response;
    }

    private formatWeatherResponse = (res: WeatherResponse, city: string): WeatherReport => {
  
        const report: WeatherReport = {
            weather_conditions: this.recognizeImportantConditions(res),
            recommended_activity: this.prepareRecommendations(res),
            temperature: this.kelvinToCelsius(res.data.main.feels_like),
            city,
            timestamp: Date.now(),
        }

        return report;
    }

    public findCurrentWeatherFor = async (city: string, { ip }: Request): Promise<WeatherReport> => {

        let query: Query = await this.query.save({ timestamp: Date.now(), city, ip });
        const TheOneDayBack = Date.now() - 1000;
        const cachedResponse = await this.weather.findOne({
            where: { city, timestamp: MoreThanOrEqual(TheOneDayBack) },
            order: { timestamp: `DESC` }
        })


        if (cachedResponse) {
            this.query.save({ ...query, weather_id: cachedResponse.id });
            return cachedResponse;
        }

        let latitude, longitude;

        try {

            [latitude, longitude] = await this.findCoordsByName(city);

        } catch (err) {
            throw new InternalServerErrorException(err);
        }

        let currentWeather: WeatherResponse;
        try {
            currentWeather = await this.findWeatherByCords(latitude, longitude);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }

        const weatherReport = this.formatWeatherResponse(currentWeather, city);
        const newWeatherLog = await this.weather.save({ ...weatherReport, timestamp: Date.now() });
        this.query.save({ ...query, weather_id: newWeatherLog.id });

        return weatherReport;
    }

}