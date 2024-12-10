import { Content } from "./components/content/content.component";
import { Footer } from "./components/footer/footer.component";
import { Header } from "./components/header/header.component"
import { Layout } from "./components/layout/layout.component"


function App() {

  const appHeader = <Header />;
  const appContent = <Content />;
  const appFooter = <Footer />;

  return <>
    <Layout
      header={appHeader}
      content={appContent}
      footer={appFooter}
    />
  </>
}

export default App
