import React from "react";
import "./Collection.scss";
import { TrackListItem } from "../../components/TrackListItem";
import { IContentPageProps } from "../Home";

export const Collection: React.FC<IContentPageProps> = props => {
  const favouriteTracks = props.tracks.filter(track =>
    props.favourites.includes(track.id)
  );

  return (
    <div className="Collection">
      <h2>Liked Songs</h2>
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
