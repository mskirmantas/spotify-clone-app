import React from "react";
import "./Display.scss";

// import { Icon } from "antd";

interface DisplayProps {
  activeTrack: ITrack | undefined;
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

export const Display: React.FC<DisplayProps> = props => {
  return (
    <div className="Display">
      {props.activeTrack ? (
        <div className="now-playing ">
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
          {/* <Icon className="btn-like" type="heart" /> */}
        </div>
      ) : null}
    </div>
  );
};
