export type Credentials = {
    isAuthenticated: boolean;
    username?: string;
    token?: string;
}

export type Auth = Credentials & {
    login: (props: Credentials) => void;
    logout: () => void;
}