import { Homepage } from "./components/content/homepage/homepage.component";
import { LoginPage } from "./components/content/loginPage/loginpage.component";
import { StatsPage } from "./components/content/statsPage/statsPage.component";

export class RouteConfig {
    path: string = '';
    component: React.ReactNode = null;
    constructor(path: string, component: React.ReactNode) {
        this.path = path;
        this.component = component
    }
}

export const routes: RouteConfig[] = [
    new RouteConfig("/", <Homepage />),
    new RouteConfig("/login", <LoginPage />),
    new RouteConfig("/stats", <StatsPage />),
]