import React from "react";
import "./ContentPage.scss";

// Containers / Pages
import { Home } from "../../containers/Home";
import { Search } from "../../containers/Search";
import { Collection } from "../../containers/Collection";
import { FileUpload } from "../../containers/FileUpload";

//Libraries
import { Route, Switch } from "react-router-dom";

interface Props {
  tracks: ITrack[];
  activeTrackID: any;
  onTrackClick: any;
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

export const ContentPage: React.FC<Props> = props => {
  return (
    <div className="ContentPage">
      <Switch>
        <Route
          path="/home"
          render={Props => (
            <Home
              tracks={props.tracks}
              activeTrackID={props.activeTrackID}
              onTrackClick={props.onTrackClick}
              audio={props.audio}
              isPlaying={props.isPlaying}
            />
          )}
        />
        <Route path="/search" component={Search} />
        <Route path="/collection" component={Collection} />
        <Route path="/upload" component={FileUpload} />
      </Switch>
    </div>
  );
};
