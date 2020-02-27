import React from "react";
import "./Search.scss";

import { TrackListItem } from "../../components/TrackListItem";
import { Icon } from "antd";

interface SearchProps {
  onTrackClick: any;
  tracks: ITrack[];
  favourites: string[];
  activeTrackID: any;
  isPlaying: boolean;
  onLikeButton: (trackID: string) => void;
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

export class Search extends React.Component<SearchProps> {
  state = {
    search: ""
  };

  //  FIX EVENT TYPE
  updateSearch(e: any) {
    this.setState({ search: e.target.value.substring(0, 40) });
  }
  clearSearch() {
    this.setState({ search: "" });
  }

  render() {
    let filteredTracks = this.props.tracks.filter(track => {
      let newTrack = track.title + " " + track.artist + " " + track.album;

      return (
        newTrack.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <div className="Search">
        <div className="search-field">
          <Icon className="search-icon" type="search" />
          <input
            type="text"
            placeholder="Search for Artists, Songs, or Albums"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
          {this.state.search ? (
            <Icon
              className="clear-icon"
              type="close"
              onClick={this.clearSearch.bind(this)}
            />
          ) : null}
        </div>

        {this.state.search ? (
          <div className="track-list">
            {filteredTracks.map(track => {
              return (
                <TrackListItem
                  key={track.id}
                  track={track}
                  onTrackClick={() => this.props.onTrackClick(track.id)}
                  onLikeButton={() => this.props.onLikeButton(track.id)}
                  isActive={track.id === this.props.activeTrackID}
                  isPlaying={this.props.isPlaying}
                  isFavourite={this.props.favourites.includes(track.id)}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
