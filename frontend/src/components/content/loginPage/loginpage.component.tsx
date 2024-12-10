import { FC, useState } from "react";
import Axios from 'axios';
import style from "./loginPage.module.css";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/cookies";


export const LoginPage: FC = () => {

    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

    const [password, setPassword] = useState<string>("");
    const [isLoginValid, setIsLoginValid] = useState<boolean>(true);

    const [isError, setIsError] = useState<boolean>(false);
    const [login, setLogin] = useState<string>("");

    const [_, setAuth] = useAuth();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const cleanInputs = () => {
        setPassword("");
        setLogin("");
    }

    const sendLoginRequest = async (e: any): Promise<boolean> => {
        e.preventDefault();
        let isInputValid = true;

        if (password === "" || password === null || password === undefined) {
            isInputValid = false;
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true);
        }

        if (login === "" || login === null || login === undefined) {
            isInputValid = false;
            setIsLoginValid(false);
        } else {
            setIsLoginValid(true);
        }

        if (!isInputValid) {
            return false;
        }

        try {
            const response = await Axios.post(`http://backend:3002/api/login`, { login, password }, { headers: { "Content-Type": "application/json" } });

            if (response.status !== 200) {
                throw new Error(`Invalid response`);
            }

            setAuth({ isAuthenticated: true, username: login, token: response.data });
            localStorage.jwt = response.data;
            localStorage.username = login
            setCookie('jwt', response.data, 7);
            navigate('/stats');
            cleanInputs();

        } catch (err) {
            setIsError(true);
            return false;
        }
        return false;
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
                    value={login}
                    onChange={(e) => setLogin(e.target.value)} />
                {!isLoginValid ? <p className="error">Login is required</p> : null}
            </div>

            <div className={style.inputWrapper}>

                <label htmlFor="user-password">Password</label>
                <div className={style.passwordWrapper}>
                    <input
                        type={isPasswordVisible ? `text` : `password`}
                        className={`${style.passwordInput} input`}
                        name="user-password"
                        id="user-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="button"
                        value={isPasswordVisible ? "🕳️" : "👁"}
                        onClick={togglePasswordVisibility}
                        className={style.toggleInput}
                    />
                </div>
                {!isPasswordValid ? <p className="error">Login is required</p> : null}

            </div>

            <div className={style.inputWrapper}>
                <input
                    type="submit"
                    value="sign in"
                    className={style.loginSubmit}
                    onClick={sendLoginRequest}
                />
            </div>

            {isError ? <p className="error">Something went wrong</p> : null}

        </form>
    )
}