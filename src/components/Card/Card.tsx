import React from "react";
import "./Card.scss";
import { Button } from "antd";

export const Card: React.FC = () => {
  return (
    <div className="Card">
      <h1>Artist Name</h1>

      <Button type="primary" shape="round" size="small">
        PLAY
      </Button>
    </div>
  );
};
