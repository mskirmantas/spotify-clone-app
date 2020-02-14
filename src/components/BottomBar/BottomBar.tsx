import React from "react";
import "./BottomBar.scss";

import { Icon } from "antd";

interface BottomBarProps {
  activeTrack: ITrack | undefined;
  isPlaying: boolean;
  onPlayBtnClick: () => void;
  onPrevBtnClick: () => void;
  onNextBtnClick: () => void;
}
interface DisplayProps {
  activeTrack: ITrack | undefined;
}
interface PlayerProps {
  isPlaying: boolean;
  onPlayBtnClick: () => void;
  onPrevBtnClick: () => void;
  onNextBtnClick: () => void;
}
interface ITrack {
  artist: string;
  album: string;
  id: string;
  time: string;
  title: string;
  url: string;
}

const Display: React.FC<DisplayProps> = props => {
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

const Player: React.FC<PlayerProps> = props => {
  return (
    <div className="Player">
      <div className="player-controls">
        <Icon
          className="player-button"
          type="step-backward"
          theme="filled"
          onClick={props.onPrevBtnClick}
        />
        <div className="player-button" onClick={props.onPlayBtnClick}>
          {props.isPlaying ? (
            <Icon className="btn-pause" type="pause" />
          ) : (
            <Icon className=" btn-play" type="caret-right" theme="filled" />
          )}
        </div>
        <Icon
          className="player-button"
          type="step-forward"
          theme="filled"
          onClick={props.onNextBtnClick}
        />
      </div>
      <div className="progress">
        <div className="progress-bar">
          <div></div>
        </div>
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
      <Player
        isPlaying={props.isPlaying}
        onPlayBtnClick={props.onPlayBtnClick}
        onPrevBtnClick={props.onPrevBtnClick}
        onNextBtnClick={props.onNextBtnClick}
      />
      <VolumeControl />
    </div>
  );
};
