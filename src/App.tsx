import React from "react";
import "./App.scss";

// Components
import { TopBar } from "./components/TopBar";
import { Navigation } from "./components/Navigation";
import { BottomBar } from "./components/BottomBar";

// Containers / Pages
import { Home } from "./containers/Home";
import { Search } from "./containers/Search";
import { Collection } from "./containers/Collection";

//Libraries
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/search" component={Search} />
                <Route path="/collection" component={Collection} />
              </Switch>
            </Content>
          </Layout>
          <BottomBar />
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
