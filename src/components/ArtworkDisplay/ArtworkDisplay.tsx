import React from "react";
import "./ArtworkDisplay.scss";
import { ITrack } from "../../App";

interface ArtworkDisplayProps {
  activeTrack: ITrack | undefined;
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
