import React from "react";
import "./Home.scss";

import { TrackListItem } from "../../components/TrackListItem";

interface HomeProps {
  onTrackClick: (trackID: string) => void;
  onLikeButton: (trackID: string) => void;
  tracks: ITrack[];
  favourites: string[];
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
  cover: string;
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
              onLikeButton={() => props.onLikeButton(track.id)}
              isActive={track.id === props.activeTrackID}
              isPlaying={props.isPlaying}
              isFavourite={props.favourites.includes(track.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
