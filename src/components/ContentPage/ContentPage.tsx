import React from "react";
import "./ContentPage.scss";

// Containers / Pages
import { Home } from "../../containers/Home";
import { Search } from "../../containers/Search";
import { Collection } from "../../containers/Collection";
import { FileUpload } from "../../containers/FileUpload";

//Libraries
import { Route, Switch } from "react-router-dom";

export const ContentPage: React.FC = () => {
  return (
    <div className="ContentPage">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/collection" component={Collection} />
        <Route path="/upload" component={FileUpload} />
      </Switch>
    </div>
  );
};
