import React from "react";
import "./Home.scss";

import { TrackList } from "../../components/TrackList";

interface HomeProps {
  onTrackClick: any;
  tracks: ITrack[];
  activeTrackID: any;
  audio: any;
  isPlaying: boolean;
}
interface ITrack {
  artist: string;
  album: string;
  id: string;
  time: string;
  title: string;
  url: string;
}

export const Home: React.FC<HomeProps> = props => {
  return (
    <div className="Home">
      {/* <p>This is: HOME PAGE</p> */}
      <div>
        <TrackList
          tracks={props.tracks}
          activeTrackID={props.activeTrackID}
          onTrackClick={props.onTrackClick}
          audio={props.audio}
          isPlaying={props.isPlaying}
        />
      </div>
    </div>
  );
};
