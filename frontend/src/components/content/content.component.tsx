import { FC } from "react";
import style from "./content.module.css";
import { Route, Routes } from "react-router-dom";
import { RouteConfig, routes } from "../../routes";

export const Content: FC = () => {

    return <div className={style.appContent}>
        <Routes>
            {routes.map((r: RouteConfig, i: number) => <Route key={i} path={r.path} element={r.component} />)}
        </Routes>
    </div>
}