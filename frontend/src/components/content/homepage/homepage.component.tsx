import React, { FC, useState } from "react";
import style from './homepage.module.css';
import Axios from 'axios';
import { Summary } from "./summary/summary.component";

export type WeatherReport = {
    weather_conditions: string;
    recommended_activity: string;
    temperature: number;
    city: string;
    timestamp: number;
}

export const Homepage: FC = () => {

    const [city, setCity] = useState<string>(``);
    const [currentCityReport, setCurrentCityReport] = useState<WeatherReport | null>(null);
    const [isCityDefined, setIsCityDefined] = useState<boolean>(false);
    const [cityNameError, setCityNameError] = useState<boolean>(false);

    const checkWeatherForCity = async (e: React.MouseEvent): Promise<void> => {
        e.preventDefault();

        if (city.length <= 2) {

            setCityNameError(true);
            return;
        } else {
            setCityNameError(false);
        }

        let isSuccess: boolean = false;
        try {

            const response = await Axios.get<WeatherReport>(`http://localhost:3002/api/weather/${city}`);

            if (response.status !== 200) {
                isSuccess = false;
                setIsCityDefined(isSuccess);
                return;
            }

            isSuccess = true;
            setIsCityDefined(isSuccess);
            setCurrentCityReport(response.data);

        } catch (err) {
            console.error(err);
        }

    }

    return (
        <div className={style.queryArea}>

            <form className={style.cityCheckForm}>

                <div className={style.inputWrapper}>

                    <label>Check weather in your city</label>

                    <div className={style.nestedWrapper}>

                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={style.cityInput}
                        />

                        <input
                            type="submit"
                            value="check"
                            onClick={checkWeatherForCity}
                            className={style.submit}
                        />

                    </div>

                    {cityNameError ? <div className="error">Incorrect city name</div> : null}

                </div>

            </form>

            {isCityDefined && currentCityReport ? <Summary data={currentCityReport} /> : null}

        </div>
    )
}