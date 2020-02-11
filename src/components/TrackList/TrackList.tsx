import React from "react";
import "./TrackList.scss";

interface TrackListProps {
  onTrackClick: any;
  tracks: ITrack[];
  activeTrackID: any;
}
interface ITrack {
  artist: string;
  id: string;
  time: string;
  title: string;
  album: string;
  url: string;
}

interface TrackListItemProps {
  isActive: boolean;
  onClick: any;
  track: ITrack;
}
const TrackListItem: React.FC<TrackListItemProps> = props => {
  return (
    <div className="TrackListItem" key={props.track.id} onClick={props.onClick}>
      <div className="track-info">
        <div className="flex-container">
          <div className="track-image" />
          <div className="track-title">
            <h4>{props.track.title}</h4>
            <h5>
              {props.track.artist} • {props.track.album}
            </h5>
          </div>
        </div>
        <div className="track-time">
          <h5>{props.track.time}</h5>
        </div>
      </div>
    </div>
  );
};

export const TrackList: React.FC<TrackListProps> = props => {
  return (
    <div className="TrackList">
      {props.tracks.map(track => {
        return (
          <TrackListItem
            key={track.id}
            track={track}
            isActive={track.id === props.activeTrackID}
            onClick={() => props.onTrackClick(track.id)}
          />
        );
      })}
    </div>
  );
};

// const togglePlay = () => {
//   setPlay(!play);
// };
// const audio = new Audio(
//   "https://firebasestorage.googleapis.com/v0/b/spotify-player-react.appspot.com/o/audioFiles%2F03%20-%20Pools.mp3?alt=media&token=5e60f306-c9a1-43c6-b78c-ecc48140d142"
// );

// useEffect(() => {
//   play ? audio.play() : audio.pause();
// }, [play]);

// useEffect(() => {
//   audio.addEventListener("ended", () => setPlay(false));
//   return () => {
//     audio.removeEventListener("ended", () => setPlay(false));
//   };
// }, []);
