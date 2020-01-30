import React from "react";
import "./TopBar.scss";

import { Icon } from "antd";

export const TopBar: React.FC = () => {
  return (
    <div className="TopBar">
      <div className="logo">
        <p>Spotify </p>
        <Icon type="pie-chart" theme="filled" className="logoIcon" />
      </div>
      <div className="otherContent">
        <p>This is going to be a Top Bar</p>
      </div>
      <div className="profile">
        <p>Log out</p>
      </div>
    </div>
  );
};
