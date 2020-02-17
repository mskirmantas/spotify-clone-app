import React, { useState, useEffect } from "react";
import "./App.scss";

import { Database } from "./config/firebase";

// Components
import { TopBar } from "./components/TopBar";
import { Navigation } from "./components/Navigation";

import { BottomBar } from "./components/BottomBar";

// Containers / Pages
import { Home } from "./containers/Home";
import { Search } from "./containers/Search";
import { Collection } from "./containers/Collection";
import { FileUpload } from "./containers/FileUpload";

//Libraries
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
  const [playingStatus, setPlayingStatus] = useState<boolean>(false);

  const [playHistory, setPlayHistory] = useState<string[]>([]);

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

  const togglePlayPause = () => {
    setPlayingStatus(!playingStatus);
    if (activeTrackID === undefined) {
      setActiveTrackID(tracks[0].id);
    }
  };

  //Set Active Track:
  const handleSetActiveTrack = (trackID: string) => {
    setActiveTrackID(trackID);
    setPlayingStatus(true);
    if (activeTrackID === trackID && playingStatus === true) {
      setPlayingStatus(false);
    }
  };

  const getActiveTrack = () => {
    if (activeTrackID) {
      return tracks.find(t => t.id === activeTrackID);
    }
  };
  const activeTrack = getActiveTrack();

  const handlePlayPrev = () => {
    if (playHistory.length > 1) {
      setActiveTrackID(playHistory.pop());
    }
  };

  const handlePlayNext = () => {
    if (activeTrackID) {
      setPlayHistory([...playHistory, activeTrackID]);
    }

    let nextTrack: string;

    do {
      nextTrack = tracks[Math.floor(Math.random() * tracks.length)].id;
    } while (
      playHistory.length > 0 &&
      playHistory[playHistory.length - 1] === nextTrack
    );
    setActiveTrackID(nextTrack);
    setPlayingStatus(true);
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
              <Switch>
                <Route
                  path="/home"
                  render={Props => (
                    <Home
                      tracks={tracks}
                      activeTrackID={activeTrackID}
                      onTrackClick={handleSetActiveTrack}
                      isPlaying={playingStatus}
                    />
                  )}
                />
                <Route path="/search" component={Search} />
                <Route path="/collection" component={Collection} />
                <Route path="/upload" component={FileUpload} />
              </Switch>
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
