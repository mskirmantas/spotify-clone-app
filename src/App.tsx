import React from "react";
import "./App.scss";
import { Firebase, Database } from "./config/firebase";

// Components
import { TopBar } from "./components/TopBar";
import { Navigation } from "./components/Navigation";
import { ArtworkDisplay } from "./components/ArtworkDisplay";
import { Home } from "./containers/Home";
import { Search } from "./containers/Search";
import { Collection } from "./containers/Collection";
import { FileUpload } from "./containers/FileUpload";

import { BottomBar } from "./components/BottomBar";
import { Login } from "./containers/Login";

//Libraries
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
const { Sider, Content } = Layout;

interface Props {}

interface IState {
  tracks: ITrack[];
  activeTrackID: string | undefined;
  playingStatus: boolean;
  playHistory: string[];
  user: any;
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

export default class App extends React.Component<Props, IState> {
  state: IState = {
    tracks: [],
    activeTrackID: undefined,
    playingStatus: false,
    playHistory: [],
    user: {}
  };

  // Fetch DATA from DB: ------------------------------------------

  componentDidMount() {
    Database.collection("files")
      .orderBy("artist", "asc")
      .get()
      .then(snapshot => {
        const newFiles: any = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          newFiles.push(data);
        });
        this.setState({
          tracks: newFiles
        });
      })
      .catch(error => console.log(error));

    this.authListener();
  }

  authListener() {
    Firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  // On Track click: ---------------------------------------------------

  handleSetActiveTrack = (trackID: string) => {
    this.setState({ activeTrackID: trackID });
    this.setState({ playingStatus: true });
    if (this.state.activeTrackID === trackID) {
      this.togglePlayPause();
    }
  };

  // Player Buttons: ----------------------------------------------------

  togglePlayPause = () => {
    this.setState({ playingStatus: !this.state.playingStatus });
    if (this.state.activeTrackID === undefined) {
      this.setState({ activeTrackID: this.state.tracks[0].id });
    }
    let audio = document.querySelector("audio");
    if (audio) {
      this.state.playingStatus ? audio.pause() : audio.play();
    }
  };

  handlePlayPrev = () => {
    if (this.state.playHistory.length > 0) {
      this.setState({ activeTrackID: this.state.playHistory.pop() });
      this.setState({ playingStatus: true });
    }
  };

  handlePlayNext = () => {
    if (this.state.activeTrackID) {
      this.setState({
        playHistory: [...this.state.playHistory, this.state.activeTrackID]
      });
    }
    const currentTrackIndex = this.state.tracks.findIndex(
      track => track.id === this.state.activeTrackID
    );
    const totalTracks = this.state.tracks.length - 1;
    const nextTrackIndex =
      currentTrackIndex === totalTracks ? 0 : currentTrackIndex + 1;
    const nextTrack = this.state.tracks[nextTrackIndex].id;
    this.setState({ activeTrackID: nextTrack });
    this.setState({ playingStatus: true });
  };

  // getActiveTrack = () => {
  //   return this.state.tracks.find(
  //     track => track.id === this.state.activeTrackID
  //   );
  // };
  // activeTrack = this.getActiveTrack();

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <TopBar isUser={this.state.user} />

            {this.state.user ? (
              <div>
                <Layout>
                  <Sider>
                    <Navigation />
                    <ArtworkDisplay
                      activeTrack={this.state.tracks.find(
                        track => track.id === this.state.activeTrackID
                      )}
                    />
                  </Sider>
                  <Content>
                    <Switch>
                      <Route
                        path="/home"
                        render={Props => (
                          <Home
                            tracks={this.state.tracks}
                            activeTrackID={this.state.activeTrackID}
                            onTrackClick={this.handleSetActiveTrack}
                            isPlaying={this.state.playingStatus}
                          />
                        )}
                      />
                      <Route
                        path="/search"
                        render={Props => (
                          <Search
                            tracks={this.state.tracks}
                            activeTrackID={this.state.activeTrackID}
                            onTrackClick={this.handleSetActiveTrack}
                            isPlaying={this.state.playingStatus}
                          />
                        )}
                      />

                      <Route path="/collection" component={Collection} />
                      <Route path="/upload" component={FileUpload} />
                    </Switch>
                  </Content>
                </Layout>

                <BottomBar
                  activeTrack={this.state.tracks.find(
                    track => track.id === this.state.activeTrackID
                  )}
                  isPlaying={this.state.playingStatus}
                  onPlayPause={this.togglePlayPause}
                  onPlayPrev={this.handlePlayPrev}
                  onPlayNext={this.handlePlayNext}
                />
              </div>
            ) : (
              <Login />
            )}
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}
