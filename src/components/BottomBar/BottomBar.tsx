import React from "react";
import "./BottomBar.scss";

import { Icon } from "antd";

const Display: React.FC = () => {
  return (
    <div className="Display">
      <div className="now-playing">
        <h4>Title</h4>
        <h5>Artist Name</h5>
      </div>
      <Icon className="btn-like" type="heart" />
    </div>
  );
};

const Player: React.FC = () => {
  return (
    <div className="Player">
      <div className="player-controls">
        <Icon className="player-button" type="step-backward" theme="filled" />
        <Icon
          className="player-button btn-play"
          type="caret-right"
          theme="filled"
        />
        <Icon className="player-button" type="step-forward" theme="filled" />
      </div>
      <div className="progress">
        <div className="progress-bar" />
      </div>
    </div>
  );
};

const VolumeControl: React.FC = () => {
  return (
    <div className="VolumeControl">
      <div className="icon">
        <Icon className="vol-icon" type="filter" rotate={90} />
        <Icon className="vol-icon" type="wifi" rotate={90} />
      </div>
      <div className="volume">
        <div className="volume-bar" />
      </div>
    </div>
  );
};

export const BottomBar: React.FC = () => {
  return (
    <div className="BottomBar">
      <Display />
      <Player />
      <VolumeControl />
    </div>
  );
};
