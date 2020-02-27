import React from "react";
import "./TrackListItem.scss";

import { Icon } from "antd";

interface TrackListItemProps {
  isActive: boolean;
  onTrackClick: () => void;
  onAddFav: () => void;
  track: ITrack;
  isPlaying: boolean;
}

interface ITrack {
  artist: string;
  id: string;
  time: string;
  title: string;
  album: string;
  url: string;
}

export const TrackListItem: React.FC<TrackListItemProps> = props => {
  return (
    <div className="TrackListItem" id={props.track.id}>
      <div className="flex-container">
        <div className="track-button" onClick={props.onTrackClick}>
          {props.isActive ? (
            <Icon
              className="track-icon-btn active-icon"
              type={props.isPlaying ? "pause" : "caret-right"}
            ></Icon>
          ) : (
            <Icon
              className="track-icon-btn"
              type="customer-service"
              theme="filled"
            />
          )}
        </div>
        <Icon className="btn-like" type="heart" onClick={props.onAddFav} />

        <div className="track-info" onClick={props.onTrackClick}>
          <div className="track-title">
            <h4 style={{ color: props.isActive ? "#1db954" : "" }}>
              {props.track.title}
            </h4>
            <h5>
              {props.track.artist} • {props.track.album}
            </h5>
          </div>

          <div className="track-time">
            <h5 style={{ color: props.isActive ? "#1db954" : "" }}>
              {props.track.time}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
