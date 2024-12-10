export type CoordsResponse = {
    data: CoordsData[]
}

type CoordsData = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

export type WeatherResponse = {
    data: {
        weather: {
            id: number;
            main: string;
            description: string;
        }[],
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
            sea_level: number;
            grnd_level: number;
        }
        visibility: number;
        wind: {
            speed: number;
            deg: number;
            gust: number;
        }
        clouds: {
            all: number;
        }
        timezone: number;
        id: number;
        name: string;
        sys: {
            type: number;
            id: number;
            country: string;
            sunrise: number;
            sunset: number;
        }
    }
}

export type WeatherReport = {
    weather_conditions: string;
    recommended_activity: string;
    temperature: number;
    city: string;
    timestamp: number;
}