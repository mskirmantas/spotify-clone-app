import React from "react";
import { Icon } from "antd";

import { ITrack } from "../../App";

import "./Display.scss";

interface DisplayProps {
  activeTrack?: ITrack;
  favourites: string[];
  onLikeButton: (trackID: string) => void;
}

export const Display: React.FC<DisplayProps> = (props) => {
  const onLikeButtonToggle = () => {
    if (props.activeTrack !== undefined) {
      props.onLikeButton(props.activeTrack.id);
    }
  };
  return (
    <div className="Display">
      {props.activeTrack ? (
        <div className="now-playing " onClick={onLikeButtonToggle}>
          <div className="album-artwork">
            <img
              src={props.activeTrack ? props.activeTrack.cover : ""}
              alt={
                props.activeTrack
                  ? props.activeTrack.album + "album artwork"
                  : ""
              }
            />
          </div>
          <div className="playing-track-title">
            <h4>{props.activeTrack.title}</h4>
            <h5>{props.activeTrack.artist}</h5>
          </div>
          <div className="btn-like">
            <Icon
              type="heart"
              theme={
                props.favourites.includes(props.activeTrack.id)
                  ? "filled"
                  : "outlined"
              }
              style={{
                color: props.favourites.includes(props.activeTrack.id)
                  ? "#1db954"
                  : "inherit",
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
