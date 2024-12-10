import { FC, useEffect, useState } from "react";
import axios from "axios";
import style from "./statsPage.module.css";
import "./statsPage.module.css";

type City = {
    city: string;
    queryCount: number;
}

type UserRequest = {
    assignedWeather: {
        city: string;
        id: number;
        recommended_activity: string;
        temperature: number;
        timestamp: number;
        weather_conditions: string;
    }
    city: string;
    id: number;
    ip: string;
    timestamp: number;
    weather_id: number;
}

export const StatsPage: FC = () => {

    let retryNumber: number = 5;
    const [count, setCount] = useState<number>(0);
    const [cities, setCities] = useState<City[]>([]);
    const [userRequests, setUserRequests] = useState<UserRequest[]>([]);

    const loadRequestsCount = () => {
        axios.get(`http://localhost:3002/api/stats/requests`, { withCredentials: true })
            .then(e => setCount(e.data.count))
            .catch(() => {
                if (retryNumber >= 0 && count === 0) {
                    setTimeout(loadRequestsCount, 500)
                } else {
                    console.log(`Failed to load requests count.`);
                }
            })
    };
    const loadCities = () => {
        axios.get(`http://localhost:3002/api/stats/top/cities`, { withCredentials: true })
            .then(e => setCities(e.data)).catch(() => {
                if (retryNumber >= 0 && cities.length === 0) {
                    setTimeout(loadCities, 500);
                } else {
                    console.log(`Failed to load cities.`);
                }
            });
    }
    const loadLatestRequests = () => {
        axios.get(`http://localhost:3002/api/stats/latest/requests`, { withCredentials: true })
            .then(e => setUserRequests(e.data)).catch(() => {
                if (retryNumber >= 0 && userRequests.length === 0) {
                    loadLatestRequests();
                } else {
                    console.log(`Failed to load user requests.`);
                }
            });
    }

    useEffect(() => {
        loadRequestsCount();
        loadCities();
        loadLatestRequests();
    }, []);

    return <div className={style.summaryField}>
        <h1 className={style.heading}>Statistics ({new Date().toLocaleDateString(`pl-PL`)})</h1>

        <div className={style.wrapper}>

            <div className={style.subWrapper}>
                <h3>Total searches</h3>
                <h3 className={style.counter}>{count}</h3>
            </div>

            <div className={style.subWrapper}>
                <h3 >Top 5 searches:</h3>
                <ul className={style.list}>
                    {cities.map((city, i) => <li key={i} className={style.listElement}>{i + 1}) {city.city} ({city.queryCount}) </li>)}
                </ul>
            </div>

        </div>

        <div className={style.wideSubWrapper}>
            <h3>Last 10 requests</h3>
            <ul className={style.list}>
                {userRequests.map((city, i) => (
                    <li key={i} className={style.listElement}><p>{i + 1}) {city.city} ({new Date(city.timestamp)
                        .toLocaleDateString(`pl-PL`)} - {city.assignedWeather.recommended_activity})
                    </p></li>))}
            </ul>
        </div>
    </div>
}