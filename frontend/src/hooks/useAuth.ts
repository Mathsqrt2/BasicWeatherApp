import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Credentials } from "../types/auth.types";

export default function useAuth(): [Credentials, (props: Credentials) => void] {

    const authContext = useContext(AuthContext)

    const setAuth = ({ isAuthenticated, username, token }: Credentials): void => {
        isAuthenticated === true ?
            authContext.login({ isAuthenticated, username, token }) :
            authContext.logout();
    }

    return [authContext, setAuth];
}