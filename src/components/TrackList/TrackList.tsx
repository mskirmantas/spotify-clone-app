import React from "react";
import "./TrackList.scss";

import { Icon } from "antd";

interface TrackListProps {
  onTrackClick: any;
  tracks: ITrack[];
  activeTrackID: any;
  audio: any;
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
  audio: any;
  isPlaying: boolean;
}
const TrackListItem: React.FC<TrackListItemProps> = props => {
  return (
    <div className="TrackListItem" key={props.track.id} onClick={props.onClick}>
      <audio id="current-track" src={props.audio} />

      <div className="track-info">
        <div className="flex-container">
          <div className="track-icon">
            {props.isPlaying && props.isActive ? (
              <Icon className="track-icon-btn active-icon" type="pause" />
            ) : (
              <Icon
                className="track-icon-btn"
                type="customer-service"
                theme="filled"
              />
            )}
          </div>
          <div className="track-title">
            <h4>{props.track.title}</h4>
            <h5>
              {props.track.artist} • {props.track.album}
            </h5>
          </div>
        </div>
        <div className="track-time">
          <h5>{props.track.time}</h5>
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
            isActive={track.id === props.activeTrackID}
            onClick={() => props.onTrackClick(track)}
            audio={props.audio}
            isPlaying={props.isPlaying}
          />
        );
      })}
    </div>
  );
};
