import React from "react";
import "./BottomBar.scss";
import { Display } from "../Display";
import { Player } from "../Player";
// import { VolumeControl } from "../VolumeControl";
import { ITrack } from "../../App";

interface BottomBarProps {
  onPlayPause: () => void;
  onPlayPrev: () => void;
  onPlayNext: () => void;
  onLikeButton: (trackID: string) => void;
  favourites: string[];
  activeTrack: ITrack | undefined;
  isPlaying: boolean;
}

export const BottomBar: React.FC<BottomBarProps> = props => {
  return (
    <div className="BottomBar">
      <Display
        activeTrack={props.activeTrack}
        favourites={props.favourites}
        onLikeButton={props.onLikeButton}
      />

      <Player
        isPlaying={props.isPlaying}
        activeTrack={props.activeTrack}
        onPlayPause={props.onPlayPause}
        onPlayPrev={props.onPlayPrev}
        onPlayNext={props.onPlayNext}
      />
      {/* <VolumeControl /> */}
    </div>
  );
};
