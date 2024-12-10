import { FC, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import style from './navbar.module.css';
import { Link } from "react-router-dom";

export const Navbar: FC = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return <nav className={style.appNavigation}>
        <ul className={style.navList}>

            <li className={style.navListItem}>
                <Link to={`/`} className={style.navLink}>Homepage</Link>
            </li>

            {isAuthenticated ? <Link to={`/stats`} className={style.navLink}>Stats</Link> : null}

            <li className={style.navListItem}>{isAuthenticated ?
                <Link to={'/'} className={style.navLink}>  Sign out</Link> :
                <Link to={'/login'} className={style.navLink}> Sign in</Link>}
            </li>

        </ul>
    </nav>
}