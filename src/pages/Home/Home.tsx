import React from "react";
import { TrackListItem } from "../../components";
import { ITrack } from "../../App";
import "./Home.scss";

export interface IContentPageProps {
  onTrackClick: (trackID: string) => void;
  onLikeButton: (trackID: string) => void;
  tracks: ITrack[];
  favourites: string[];
  activeTrackID: string | undefined;
  isPlaying: boolean;
}

export const Home: React.FC<IContentPageProps> = props => {
  return (
    <div className="Home">
      <h2>Home</h2>
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
