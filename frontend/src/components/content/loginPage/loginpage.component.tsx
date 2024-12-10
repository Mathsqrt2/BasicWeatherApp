import { FC, useState } from "react";
import Axios from 'axios';
import style from "./loginPage.module.css";
import useAuth from "../../../hooks/useAuth";

export const LoginPage: FC = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [password, setPassword] = useState<string>(``);
    const [login, setLogin] = useState<string>(``);

    const [auth, setAuth] = useAuth();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const sendLoginRequest = async (e: any) => {
        e.preventDefault();

        try {
            const response = await Axios.post(`${window.location.origin}/api/login`, { login, password });

            if (response.status !== 200) {
                return;
            }



        } catch (err) {
            console.log(err);
        }

    }

    return (
        <form className={style.loginForm}>

            <div className={style.inputWrapper}>
                <label htmlFor="user-login">Login</label>
                <input
                    type="text"
                    className={style.loginInput}
                    name="user-login"
                    id="user-login"
                    onChange={(e) => setLogin(e.target.value)} />
            </div>

            <div className={style.inputWrapper}>

                <label htmlFor="user-password">Password</label>
                <div className={style.passwordWrapper}>
                    <input
                        type={isPasswordVisible ? `text` : `password`}
                        className={`${style.passwordInput} input`}
                        name="user-password"
                        id="user-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="button"
                        value={isPasswordVisible ? "🕳️" : "👁"}
                        onClick={togglePasswordVisibility}
                        className={style.toggleInput}
                    />
                </div>

            </div>

            <div className={style.inputWrapper}>
                <input
                    type="submit"
                    value="sign in"
                    className={style.loginSubmit}
                    onClick={sendLoginRequest}
                />
            </div>

        </form>
    )
}