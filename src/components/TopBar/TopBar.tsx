import React from "react";
import { Firebase } from "../../config/firebase";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Layout, Button } from "antd";
import "./TopBar.scss";
const { Sider, Content } = Layout;

interface TopBarProps {
  isUser: boolean;
}
export const TopBar: React.FC<TopBarProps> = props => {
  const logout = () => {
    Firebase.auth().signOut();
  };

  return (
    <Layout>
      <Sider>
        <NavLink className="logo" to="/" exact>
          <FontAwesomeIcon icon={faSpotify} className="logoIcon" spin />
          <h1>Spotify</h1>
        </NavLink>
      </Sider>

      <Content>
        <div
          className="TopBar"
          style={
            props.isUser
              ? { backgroundColor: "" }
              : { backgroundColor: "#101010" }
          }
        >
          <div className="history-navigation">
            {/* <Icon className="history-nav-icon" type="left" />
            <Icon className="history-nav-icon" type="right" /> */}
          </div>

          {props.isUser ? (
            <NavLink className="logout" to="/" exact>
              <Button onClick={logout} className="btn-logout" shape="round">
                <b>Log Out</b>
              </Button>
            </NavLink>
          ) : null}
        </div>
      </Content>
    </Layout>
  );
};
