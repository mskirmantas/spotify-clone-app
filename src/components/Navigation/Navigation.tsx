import React from "react";
import "./Navigation.scss";

import { Icon } from "antd";

export const Navigation: React.FC = () => {
  return (
    <div className="Navigation">
      <div className="tab home-tab">
        <Icon type="home" />
        <p>Home</p>
      </div>
      <div className="tab search-tab">
        <Icon type="search" />
        <p>Search</p>
      </div>
      <div className="tab collection-tab">
        <Icon type="align-right" rotate={90} />
        <p>Your Library</p>
      </div>
    </div>
  );
};
