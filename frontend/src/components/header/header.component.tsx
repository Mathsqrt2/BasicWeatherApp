import { FC } from "react";
import style from "./header.module.css"


export const Header: FC = () => {
    return <header className={style.appHeader}>
        <span className={style.appTitle}>Basic Weather App</span>
        <div className={style.appNavigation}>Routes</div>
    </header>
}