import React from "react";
import "./TrackList.scss";

const TrackListItem: React.FC = () => {
  return (
    <div className="TrackListItem">
      <div className="track-info">
        <div className="flex-container">
          <div className="track-image" />
          <div className="track-title">
            <h4>Title</h4>
            <h5>Artist • Album Name</h5>
          </div>
        </div>
        <div className="track-time">
          <h5>3:24</h5>
        </div>
      </div>
    </div>
  );
};

export const TrackList: React.FC = () => {
  return (
    <div className="TrackList">
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
    </div>
  );
};
