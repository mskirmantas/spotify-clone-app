import React from "react";
import "./Search.scss";
import { TrackListItem } from "../../components/TrackListItem";
import { IContentPageProps } from "../Home";
import { Icon } from "antd";

export const Search: React.FC<IContentPageProps> = props => {
  const [search, setSearch] = React.useState("");

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.substring(0, 40));
  };

  const clearSearch = () => {
    setSearch("");
  };

  const filteredTracks = props.tracks.filter(track => {
    let newTrack = track.title + " " + track.artist + " " + track.album;
    return newTrack.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <div className="Search">
      <h2>Search</h2>
      <div className="search-field">
        <Icon className="search-icon" type="search" />
        <input
          type="text"
          placeholder="Search for Artists, Songs, or Albums"
          value={search}
          onChange={updateSearch}
        />
        {search ? (
          <Icon className="clear-icon" type="close" onClick={clearSearch} />
        ) : null}
      </div>

      {search ? (
        <div className="track-list">
          {filteredTracks.map(track => {
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
      ) : null}
    </div>
  );
};
