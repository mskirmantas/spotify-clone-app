import React from "react";
import "./Home.scss";

import { TrackListItem } from "../../components/TrackListItem";

interface HomeProps {
  onTrackClick: (trackID: string) => void;
  onAddFav: (favourite: any) => void;
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
              onTrackClick={() => props.onTrackClick(track.id)}
              onAddFav={() => props.onAddFav(track)}
              isActive={track.id === props.activeTrackID}
              isPlaying={props.isPlaying}
            />
          );
        })}
      </div>
    </div>
  );
};
