import React from "react";
import "./Home.scss";

import { TrackListItem } from "../../components/TrackListItem";

interface HomeProps {
  onTrackClick: any;
  tracks: ITrack[];
  activeTrackID: any;
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
    </div>
  );
};
