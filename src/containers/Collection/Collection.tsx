import React from "react";
import "./Collection.scss";
import { TrackListItem } from "../../components/TrackListItem";

interface CollectionProps {
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

export const Collection: React.FC<CollectionProps> = props => {
  const favouriteTracks = props.tracks.filter(track =>
    props.favourites.includes(track.id)
  );

  return (
    <div className="Collection">
      <p>Liked Songs</p>
      <div className="TrackList">
        {favouriteTracks.map(favourite => {
          return (
            <TrackListItem
              key={favourite.id}
              track={favourite}
              onTrackClick={() => props.onTrackClick(favourite.id)}
              onLikeButton={() => props.onLikeButton(favourite.id)}
              isActive={favourite.id === props.activeTrackID}
              isPlaying={props.isPlaying}
              isFavourite={props.favourites.includes(favourite.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
