import React from "react";
import "./Home.scss";

import { TrackList } from "../../components/TrackList";
// import { Card } from "../../components/Card";
// import { Row, Col } from "antd";

export const Home: React.FC = () => {
  return (
    <div className="Home">
      {/* <p>This is: HOME PAGE</p> */}
      <div>
        <TrackList />
      </div>
    </div>
  );
};
