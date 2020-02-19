import React from "react";
import "./ArtworkDisplay.scss";

interface ArtworkDisplayProps {
  activeTrack: ITrack | undefined;
}

interface ITrack {
  artist: string;
  album: string;
  id: string;
  time: string;
  title: string;
  url: string;
  cover: string;
}

export const ArtworkDisplay: React.FC<ArtworkDisplayProps> = props => {
  return (
    <div className="ArtworkDisplay">
      <img src={props.activeTrack ? props.activeTrack.cover : ""} alt="" />
    </div>
  );
};
