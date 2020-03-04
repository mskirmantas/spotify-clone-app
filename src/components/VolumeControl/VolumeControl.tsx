import React from "react";
import { Icon } from "antd";
import "./VolumeControl.scss";

export const VolumeControl: React.FC = () => {
  const [volume, setVolume] = React.useState<number>(0.75);

  const changeVolume = (evt: React.MouseEvent) => {
    let volumeBar = document.getElementById("volume");
    if (volumeBar !== null) {
      let volumeLevel =
        (evt.clientX - offsetLeft(evt.target)) / volumeBar.clientWidth;
      setVolume(volumeLevel);
    }
  };

  const offsetLeft = (el: any) => {
    let left = 0;
    while (el) {
      left += el.offsetLeft;
      el = el.offsetParent;
    }
    return left;
  };

  return (
    <div className="VolumeControl">
      <div className="icon">
        <Icon className="vol-icon" type="filter" rotate={90} />
        <Icon className="vol-icon" type="wifi" rotate={90} />
      </div>
      <div id="volume" className="volume" onClick={changeVolume}>
        <div className="volume-bar" style={{ width: volume * 100 + "%" }} />
      </div>
    </div>
  );
};
