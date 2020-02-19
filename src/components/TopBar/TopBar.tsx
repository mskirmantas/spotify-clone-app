import React from "react";
import "./TopBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import { Layout, Icon, Button } from "antd";
const { Sider, Content } = Layout;

export const TopBar: React.FC = () => {
  return (
    <Layout>
      <Sider>
        <NavLink className="logo" to="/home">
          <FontAwesomeIcon icon={faSpotify} className="logoIcon" spin />
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
