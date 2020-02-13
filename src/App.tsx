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

  // Play Audio:
  useEffect(() => {
    if (audio) playingStatus ? audio.play() : audio.pause();
  });

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
          />
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
