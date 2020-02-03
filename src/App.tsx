import React from "react";
import "./App.scss";

// Components
import { TopBar } from "./components/TopBar";
import { Navigation } from "./components/Navigation";
import { ContentPage } from "./components/ContentPage";
import { BottomBar } from "./components/BottomBar";

//Libraries
import { BrowserRouter } from "react-router-dom";
import { Layout } from "antd";
const { Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <TopBar />
          <Layout>
            <Sider>
              <Navigation />
            </Sider>
            <Content>
              <ContentPage />
            </Content>
          </Layout>
          <BottomBar />
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
