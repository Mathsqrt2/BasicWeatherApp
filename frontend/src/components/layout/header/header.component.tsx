import { FC } from "react";
import style from "./header.module.css"
import { Navbar } from "../navbar/navbar.component";


export const Header: FC = () => {
    return <header className={style.appHeader}>
        <span className={style.appTitle}>Basic Weather App</span>
        <Navbar />
    </header>
}