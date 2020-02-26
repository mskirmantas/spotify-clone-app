import React from "react";
import "./BottomBar.scss";
import { Display } from "../Display";
import { Player } from "../Player";
// import { VolumeControl } from "../VolumeControl";

interface BottomBarProps {
  activeTrack: ITrack | undefined;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPlayPrev: () => void;
  onPlayNext: () => void;
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

export const BottomBar: React.FC<BottomBarProps> = props => {
  return (
    <div className="BottomBar">
      <Display activeTrack={props.activeTrack} />
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
