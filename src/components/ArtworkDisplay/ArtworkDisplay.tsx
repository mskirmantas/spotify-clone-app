import React from "react";

import { ITrack } from "../../App";

import "./ArtworkDisplay.scss";

interface ArtworkDisplayProps {
  activeTrack?: ITrack;
}

export const ArtworkDisplay: React.FC<ArtworkDisplayProps> = props => {
  return (
    <div className="ArtworkDisplay">
      <img
        src={props.activeTrack ? props.activeTrack.cover : ""}
        alt={props.activeTrack ? props.activeTrack.album + "album artwork" : ""}
      />
    </div>
  );
};
