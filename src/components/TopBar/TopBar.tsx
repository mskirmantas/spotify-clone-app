import React from "react";
import "./TopBar.scss";

import { NavLink } from "react-router-dom";
import { Layout, Icon, Button } from "antd";
const { Sider, Content } = Layout;

export const TopBar: React.FC = () => {
  return (
    <Layout>
      <Sider>
        <NavLink className="logo" to="/">
          <Icon type="play-circle" theme="filled" className="logoIcon" />
          <p>Spotify</p>
        </NavLink>
      </Sider>

      <Content>
        <div className="TopBar">
          <div className="history-navigation">
            <Icon className="history-nav-icon" type="left" />
            <Icon className="history-nav-icon" type="right" />
          </div>
          <div className="profile">
            <Button className="btn-log-out" size="default" shape="round">
              <b>Log Out</b>
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};
