import { FC, useState } from "react";
import Axios from 'axios';
import style from "./loginPage.module.css";


export const LoginPage: FC = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

    const [password, setPassword] = useState<string>("");
    const [isLoginValid, setIsLoginValid] = useState<boolean>(true);

    const [isError, setIsError] = useState<boolean>(false);
    const [login, setLogin] = useState<string>("");

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

        cleanInputs();

        try {
            const response = await Axios.post(`${window.location.origin}/api/login`, { login, password });

            if (response.status !== 200) {
                throw new Error(`Invalid response`);
            }

        } catch (err) {
            console.log(err);
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