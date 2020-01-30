import React from "react";
import "./BottomBar.scss";

import { Icon } from "antd";

export const BottomBar: React.FC = () => {
  return (
    <div className="now-playing-bar">
      <div className="Player">
        <Icon type="step-backward" theme="filled" />
        <Icon type="caret-right" theme="filled" />
        <Icon type="step-forward" theme="filled" />
      </div>
    </div>
  );
};
