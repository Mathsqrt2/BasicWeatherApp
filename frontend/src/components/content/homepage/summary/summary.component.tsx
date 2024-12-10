import { FC } from "react";
import { WeatherReport } from "../homepage.component";
import style from "./summary.module.css";

type SummaryProps = { data: WeatherReport };

export const Summary: FC<SummaryProps> = (props) => {

    return <div className={style.summaryWrapper}>
        <div>
            <h3 className={style.heading}>Recommendation for</h3>
            <p className={style.paragraph}>city: {props?.data.city}</p>
            <p className={style.paragraph}>temperature: {props.data.temperature}°C</p>
            <p className={style.paragraph}>time: {new Date(props.data.timestamp).toLocaleString(`pl-PL`)}</p>
        </div>
        <div>
            <h3 className={style.sectionBreaker}>Weather conditions</h3>
            <p> {props.data.weather_conditions} </p>
        </div>
        {props.data.recommended_activity ?
            <div>
                <h3>Recommendation</h3>
                <p> {props.data.recommended_activity}</p>
            </div>
            : null
        }
    </div>
}