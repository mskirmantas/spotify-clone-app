import React from "react";
import "./ContentPage.scss";

// Containers / Pages
import { Home } from "../../containers/Home";
import { Search } from "../../containers/Search";
import { Collection } from "../../containers/Collection";

//Libraries
import { Route, Switch } from "react-router-dom";

export const ContentPage: React.FC = () => {
  return (
    <div className="ContentPage">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/search" component={Search} />
        <Route path="/collection" component={Collection} />
      </Switch>
    </div>
  );
};
