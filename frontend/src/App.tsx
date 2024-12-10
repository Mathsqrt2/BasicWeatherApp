import { useState } from "react";
import { Content } from "./components/content/content.component";
import { Footer } from "./components/layout/footer/footer.component";
import { Header } from "./components/layout/header/header.component"
import { Layout } from "./components/layout/layout.component"
import { Credentials } from "./types/auth.types";
import AuthContext from "./context/AuthContext";

function App() {

  const [auth, setAuth] = useState<Credentials>({ isAuthenticated: false, username: ``, token: `` })

  const appHeader = <Header />;
  const appContent = <Content />;
  const appFooter = <Footer />;

  return <>
    <AuthContext.Provider value={{
      isAuthenticated: auth.isAuthenticated,
      username: auth.username,
      token: auth.token,
      login: (props: Credentials) => setAuth({ isAuthenticated: true, username: props.username, token: props.token }),
      logout: () => setAuth({ isAuthenticated: false, username: ``, token: `` })

    }}>
      <Layout
        header={appHeader}
        content={appContent}
        footer={appFooter}
      />
    </AuthContext.Provider >
  </>
}

export default App
