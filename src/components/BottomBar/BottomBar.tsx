import React from "react";
import "./BottomBar.scss";

import { Icon } from "antd";

interface BottomBarProps {
  activeTrack: ITrack | undefined;
}
interface ITrack {
  artist: string;
  album: string;
  id: string;
  time: string;
  title: string;
  url: string;
}

const Display: React.FC<BottomBarProps> = props => {
  return (
    <div className="display-container">
      {props.activeTrack ? (
        <div className="Display">
          <div className="now-playing">
            <h4>{props.activeTrack.title}</h4>
            <h5>{props.activeTrack.artist}</h5>
          </div>
          <Icon className="btn-like" type="heart" />
        </div>
      ) : null}
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

export const BottomBar: React.FC<BottomBarProps> = props => {
  return (
    <div className="BottomBar">
      <Display activeTrack={props.activeTrack} />
      <Player />
      <VolumeControl />
    </div>
  );
};
