import React from "react";
import "./Navigation.scss";

import { NavLink } from "react-router-dom";
import { Icon } from "antd";

export const Navigation: React.FC = () => {
  return (
    <div className="Navigation">
      <div className="tab home-tab">
        <NavLink to="/">
          <Icon className="navlink-icon" type="home" />
          <p>Home</p>
        </NavLink>
      </div>
      <div className="tab search-tab">
        <NavLink to="/search">
          <Icon className="navlink-icon" type="search" />
          <p>Search</p>
        </NavLink>
      </div>
      <div className="tab collection-tab">
        <NavLink to="/collection">
          <Icon className="navlink-icon" type="align-right" rotate={90} />
          <p>Your Library</p>
        </NavLink>
      </div>
    </div>
  );
};
