import { Auth } from "../types/auth.types";
import React from "react";

const AuthContext = React.createContext<Auth>({
    isAuthenticated: false,
    username: ``,
    token: ``,
    login: () => { },
    logout: () => { },
});

AuthContext.displayName = `AuthContext`;
export default AuthContext;