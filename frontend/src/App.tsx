import { useEffect, useState } from "react";
import { Content } from "./components/content/content.component";
import { Footer } from "./components/layout/footer/footer.component";
import { Header } from "./components/layout/header/header.component"
import { Layout } from "./components/layout/layout.component"
import { Credentials } from "./types/auth.types";
import AuthContext from "./context/AuthContext";
import { setCookie } from "./components/utils/cookies";

function App() {

  const [auth, setAuth] = useState<Credentials>({ isAuthenticated: false, username: ``, token: `` });

  useEffect(() => {
    const token = localStorage.getItem(`jwt`);
    if (token) {
      const username = localStorage.username;
      setAuth({ isAuthenticated: true, token, username })
      setCookie(`jwt`, token, 1);
    }
  }, [])

  const appHeader = <Header />;
  const appContent = <Content />;
  const appFooter = <Footer />;

  return <>
    <AuthContext.Provider value={{
      isAuthenticated: auth.isAuthenticated,
      username: auth.username,
      token: auth.token,
      login: ({ isAuthenticated, username, token }: Credentials) => setAuth({ isAuthenticated, username, token }),
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
