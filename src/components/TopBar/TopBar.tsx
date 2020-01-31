import React from "react";
import "./TopBar.scss";

import { Layout, Icon } from "antd";
const { Sider, Content } = Layout;

export const TopBar: React.FC = () => {
  return (
    <Layout>
      <Sider>
        <div className="logo">
          <Icon type="play-circle" theme="filled" className="logoIcon" />

          <p>Spotify</p>
        </div>
      </Sider>

      <Content>
        <div className="TopBar">
          <div className="otherContent">
            <Icon type="left" />
            <Icon type="right" />
          </div>
          <div className="profile">
            <p>Log out</p>
          </div>
        </div>
      </Content>
    </Layout>
  );
};
