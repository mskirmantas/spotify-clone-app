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

  const handleSetActiveTrack = (trackID: string | undefined) => {
    setActiveTrackID(trackID);
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
              />
            </Content>
          </Layout>
          <BottomBar activeTrack={tracks.find(t => t.id === activeTrackID)} />
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
