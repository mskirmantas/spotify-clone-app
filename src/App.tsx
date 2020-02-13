import React, { useState, useEffect } from "react";
import "./App.scss";

import { Database } from "./config/firebase";

// Components
import { TopBar } from "./components/TopBar";
import { Navigation } from "./components/Navigation";
import { ContentPage } from "./components/ContentPage";
import { BottomBar } from "./components/BottomBar";

//Libraries
import { BrowserRouter } from "react-router-dom";
import { Layout } from "antd";
const { Sider, Content } = Layout;

interface ITrack {
  artist: string;
  album: string;
  id: string;
  time: string;
  title: string;
  url: string;
}

const App: React.FC = () => {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [activeTrackID, setActiveTrackID] = useState<string | undefined>(
    undefined
  );
  const [aT, setAT] = useState<ITrack | undefined>(undefined);
  const [audio, setAudio] = useState<any>();
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    Database.collection("files")
      .get()
      .then(snapshot => {
        const musicFiles: any = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          musicFiles.push(data);
        });
        setTracks(musicFiles);
      })
      .catch(error => console.log(error));
  }, []);

  const audioTest: any = document.getElementById("song");

  const togglePlayPause = () => {
    setPlaying(!playing);
    // playing ? song.play() : song.pause();
  };

  function getActiveTrack(): ITrack | undefined {
    if (activeTrackID) {
      return tracks.find(t => t.id === activeTrackID);
    }
  }
  const activeTrack = getActiveTrack();

  // const handleSetActiveTrack = (trackID: string) => {
  //   setActiveTrackID(trackID);
  //   setPlaying(true);
  //   if (activeTrackID === trackID && playing === true) {
  //     setPlaying(false);
  //   }
  //   if (activeTrack) {
  //     setAudio(activeTrack.url);
  //   }
  // };

  const handleSetActiveTrack = (track: ITrack) => {
    setAT(track);
    setActiveTrackID(track.id);
    setPlaying(true);
    if (activeTrackID === track.id && playing === true) {
      setPlaying(false);
    }
    setAudio(track.url);
  };
  // console.log(audio);
  useEffect(() => {
    if (audioTest) playing ? audioTest.play() : audioTest.pause();
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <TopBar />
          <Layout>
            <Sider>
              <Navigation />
            </Sider>
            <Content>
              <ContentPage
                tracks={tracks}
                activeTrackID={activeTrackID}
                onTrackClick={handleSetActiveTrack}
                audio={audio}
              />
            </Content>
          </Layout>
          <BottomBar
            activeTrack={aT}
            isPlaying={playing}
            onPlayBtnClick={togglePlayPause}
          />
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;

// const togglePlay = () => {
//   setPlay(!play);
// };
// const audio = new Audio(
//   "https://firebasestorage.googleapis.com/v0/b/spotify-player-react.appspot.com/o/audioFiles%2F03%20-%20Pools.mp3?alt=media&token=5e60f306-c9a1-43c6-b78c-ecc48140d142"
// );

// useEffect(() => {
//   playing ? audio.play() : audio.pause();
// }, [playing, audio]);

// useEffect(() => {
//   audio.addEventListener("ended", () => setPlay(false));
//   return () => {
//     audio.removeEventListener("ended", () => setPlay(false));
//   };
// }, []);
