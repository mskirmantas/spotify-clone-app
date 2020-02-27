import React from "react";
import "./Collection.scss";
import { TrackListItem } from "../../components/TrackListItem";

interface CollectionProps {
  onTrackClick: (trackID: string) => void;
  onAddFav: (favourite: any) => void;
  tracks: ITrack[];
  favourites: ITrack[];
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

export const Collection: React.FC<CollectionProps> = props => {
  return (
    <div className="Collection">
      <div className="TrackList">
        {props.favourites.map(favourite => {
          return (
            <TrackListItem
              key={favourite.id}
              track={favourite}
              onTrackClick={() => props.onTrackClick(favourite.id)}
              onAddFav={() => props.onAddFav(favourite)}
              isActive={favourite.id === props.activeTrackID}
              isPlaying={props.isPlaying}
            />
          );
        })}
      </div>
    </div>
  );
};
