import React from "react";
import "./Player.scss";

import { Icon } from "antd";

interface PlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPlayPrev: () => void;
  onPlayNext: () => void;
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

export class Player extends React.Component<PlayerProps> {
  state = {
    progress: 0,
    progressLiveUpdate: false
  };

  is_progress_dirty = false;
  interval_id = setInterval(this.onUpdate.bind(this), 250);

  onUpdate() {
    let audio = document.querySelector("audio");
    if (audio && !this.is_progress_dirty) {
      this.setState({
        progress: audio.currentTime / audio.duration
      });
    }
    this.handleTrackEnded();
  }

  handleTrackEnded() {
    if (this.state.progress === 1) {
      this.props.onPlayNext();
    }
  }

  startSetProgress(evt: React.MouseEvent) {
    this.setState({
      progressLiveUpdate: true
    });
    this.setProgress(evt);
  }

  stopSetProgress(evt: React.MouseEvent) {
    this.setState({
      progressLiveUpdate: false
    });
    this.setProgress(evt);
  }

  setProgress(evt: React.MouseEvent) {
    let progressBar = document.getElementById("progress_bar");
    if (this.state.progressLiveUpdate && progressBar !== null) {
      let progress =
        (evt.clientX - offsetLeft(evt.target)) / progressBar.clientWidth;
      this.setState({
        progress: progress
      });
      this.is_progress_dirty = true;
    }
  }

  render() {
    let currentTime: number = 0;
    let totalTime: number = 0;

    let audio: HTMLAudioElement | null = document.querySelector("audio");
    if (audio) {
      if (this.is_progress_dirty) {
        this.is_progress_dirty = false;
        audio.currentTime = audio.duration * this.state.progress;
      }
      currentTime = audio.currentTime;
      totalTime = audio.duration;
    }

    return (
      <div className="Player">
        {this.props.activeTrack ? (
          <audio
            src={this.props.activeTrack.url}
            autoPlay={this.props.isPlaying}
          />
        ) : null}
        <div className="player-controls">
          <Icon
            className="player-button"
            type="step-backward"
            theme="filled"
            onClick={this.props.onPlayPrev}
          />
          <div className="player-button" onClick={this.props.onPlayPause}>
            {this.props.isPlaying ? (
              <Icon className="btn-pause" type="pause" />
            ) : (
              <Icon className="btn-play" type="caret-right" theme="filled" />
            )}
          </div>
          <Icon
            className="player-button"
            type="step-forward"
            theme="filled"
            onClick={this.props.onPlayNext}
          />
        </div>
        <div className="timeline">
          <div className="time">
            <h5>{formatTime(currentTime)}</h5>
          </div>

          <div
            id="progress_bar"
            className="progress"
            onMouseDown={this.startSetProgress.bind(this)}
            // onMouseMove={this.setProgress.bind(this)}
            onMouseUp={this.stopSetProgress.bind(this)}
          >
            <div
              className="bar"
              style={{ width: this.state.progress * 100 + "%" }}
            />
          </div>

          <div className="time">
            <h5>{formatTime(totalTime)}</h5>
          </div>
        </div>
      </div>
    );
  }
}

function formatToNumber(num: number) {
  var str = num + "";
  if (str.length === 1) {
    return "0" + str;
  }
  if (str.length === 0) {
    return "00";
  }
  return str;
}

function formatTime(s: number) {
  if (!s && s !== 0) {
    return "00:00";
  }

  const total_seconds = Math.floor(s);
  const hours = Math.floor(total_seconds / 3600);
  const minutes = Math.floor(total_seconds / 60) - hours * 60;
  const seconds = total_seconds - minutes * 60 - hours * 3600;

  if (hours) {
    return (
      hours + ":" + formatToNumber(minutes) + ":" + formatToNumber(seconds)
    );
  }

  return formatToNumber(minutes) + ":" + formatToNumber(seconds);
}

function offsetLeft(el: any) {
  let left: number = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}
