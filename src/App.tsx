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
  const [activeTrack, setActiveTrack] = useState<ITrack | undefined>(undefined);
  const [activeTrackID, setActiveTrackID] = useState<string | undefined>(
    undefined
  );
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [playingStatus, setPlayingStatus] = useState<boolean>(false);

  const [playHistory, setPlayHistory] = useState<ITrack[]>([]);

  // Get Files from DB:
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

  // Get Audio source:
  const audio: any = document.getElementById("current-track");

  // Play Audio:  <----------- pakeist i paprastas funkcijas
  useEffect(() => {
    if (audio) playingStatus ? audio.play() : audio.pause();
  }, [audio, playingStatus]);

  const togglePlayPause = () => {
    setPlayingStatus(!playingStatus);
  };

  //Set Active Track:
  const handleSetActiveTrack = (track: ITrack) => {
    setActiveTrack(track);
    setActiveTrackID(track.id);
    setAudioSrc(track.url);
    setPlayingStatus(true);
    if (activeTrackID === track.id && playingStatus === true) {
      setPlayingStatus(false);
    }
    setPlayHistory([...playHistory, track]);
  };
  const handlePlayPrev = () => {
    if (playHistory.length > 1) {
      setActiveTrack(playHistory.pop());
    }
  };

  const handlePlayNext = () => {
    let nextTrack: ITrack;
    do {
      nextTrack = tracks[Math.floor(Math.random() * tracks.length)];
    } while (
      playHistory.length > 0 &&
      playHistory[playHistory.length - 1] === nextTrack
    );
    handleSetActiveTrack(nextTrack);
  };

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
                audio={audioSrc}
                isPlaying={playingStatus}
              />
            </Content>
          </Layout>
          <BottomBar
            activeTrack={activeTrack}
            isPlaying={playingStatus}
            onPlayBtnClick={togglePlayPause}
            onPrevBtnClick={handlePlayPrev}
            onNextBtnClick={handlePlayNext}
          />
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
