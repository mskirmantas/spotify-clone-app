import React from "react";
import { Icon } from "antd";

import { ITrack } from "../../App";

import "./TrackListItem.scss";

interface TrackListItemProps {
  onTrackClick: () => void;
  onLikeButton: () => void;
  track: ITrack;
  isActive: boolean;
  isPlaying: boolean;
  isFavourite: boolean;
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
        <div className="like-status">
          <Icon
            className="like-btn"
            type={props.isFavourite ? "heart" : "plus"}
            theme={props.isFavourite ? "filled" : "outlined"}
            style={{ color: props.isFavourite ? "#bbbbbb" : "" }}
            onClick={props.onLikeButton}
          />
        </div>

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
