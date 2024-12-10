import { FC } from "react";
import style from "./footer.module.css";

export const Footer: FC = () => {
    return <footer className={style.appFooter}>
        <span className={style.appAuthor}>
            Zadanie testowe - Michał Bugajski 2024 &#169;
        </span>
    </footer>
}