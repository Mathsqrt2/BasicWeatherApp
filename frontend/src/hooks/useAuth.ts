import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Credentials } from "../types/auth.types";

export default function useAuth() {

    const authContext = useContext(AuthContext)
    const auth = authContext.isAuthenticated;

    const setAuth = ({ isAuthenticated, username, token }: Credentials): void => {
        isAuthenticated === true ?
            authContext.login({ isAuthenticated, username, token }) :
            authContext.logout();
    }

    return [auth, setAuth];
}