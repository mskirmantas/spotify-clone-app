import React from "react";
import "./TrackList.scss";

import { Icon } from "antd";

interface TrackListProps {
  onTrackClick: any;
  tracks: ITrack[];
  activeTrackID: any;

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

interface TrackListItemProps {
  isActive: boolean;
  onClick: any;
  track: ITrack;

  isPlaying: boolean;
}

const TrackListItem: React.FC<TrackListItemProps> = props => {
  return (
    <div className="TrackListItem" id={props.track.id} onClick={props.onClick}>
      <div className="flex-container">
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

        <div className="track-info">
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

export const TrackList: React.FC<TrackListProps> = props => {
  return (
    <div className="TrackList">
      {props.tracks.map(track => {
        return (
          <TrackListItem
            key={track.id}
            track={track}
            onClick={() => props.onTrackClick(track.id)}
            isActive={track.id === props.activeTrackID}
            isPlaying={props.isPlaying}
          />
        );
      })}
    </div>
  );
};
