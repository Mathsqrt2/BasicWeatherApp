import { FC } from "react";
import style from "./content.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Content: FC = () => {

    return <div className={style.appContent}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>home</div>} />
                <Route path="/stats" element={<>stats view</>} />
            </Routes>
        </BrowserRouter>
    </div>
}