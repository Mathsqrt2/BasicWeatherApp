import { FC } from "react";

import style from './navbar.module.css';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { deleteCookie } from "../../utils/cookies";

export const Navbar: FC = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    const onLogout = (): void => {
        setAuth({ isAuthenticated: false, token: '', username: '' });
        localStorage.removeItem(`jwt`);
        deleteCookie(`jwt`);
        navigate('/');
    }

    return <nav className={style.appNavigation}>
        <ul className={style.navList}>

            <li className={style.navListItem}>
                <Link to={`/`} className={style.navLink}>Homepage</Link>
            </li>

            {auth.isAuthenticated ? <Link to={`/stats`} className={style.navLink}>Stats</Link> : null}

            <li className={style.navListItem}>{auth.isAuthenticated ?
                <Link to={'/'} className={style.navLink} onClick={onLogout}>  Sign out</Link> :
                <Link to={'/login'} className={style.navLink}> Sign in</Link>}
            </li>

        </ul>
    </nav>
}