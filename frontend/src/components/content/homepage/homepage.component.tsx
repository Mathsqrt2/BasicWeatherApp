import React, { FC, useState } from "react";
import style from './homepage.module.css';
import Axios from 'axios';
import { Summary } from "./summary/summary.component";



export const Homepage: FC = () => {

    const [city, setCity] = useState<string>(``);

    const checkWeatherForCity = async (e: React.MouseEvent): Promise<void> => {
        e.preventDefault();

        try {

            const response = await Axios.get(`${window.location.origin}/api/weather/${city}`);
            console.log(`success`, response);

        } catch (err) {
            console.log(err);
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

                </div>

            </form>

            <div>

                <h3>
                    Summary
                </h3>

                <Summary />

            </div>

        </div>
    )
}