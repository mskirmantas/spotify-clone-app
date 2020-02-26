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
  favourites: string[];
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
    user: {},
    favourites: []
  };

  componentWillMount() {
    const localStorageItem = localStorage.getItem("tracks");
    if (localStorageItem) {
      this.setState({ tracks: JSON.parse(localStorageItem) });
    }
  }

  componentDidMount() {
    this.authListener();
    if (!localStorage.getItem("tracks")) {
      this.fetchData();
    }
  }

  authListener() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  fetchData() {
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
  }

  componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<IState>) {
    localStorage.setItem("tracks", JSON.stringify(nextState.tracks));
  }

  handleSetActiveTrack = (trackID: string) => {
    this.setState({ activeTrackID: trackID });
    this.setState({ playingStatus: true });
    if (this.state.activeTrackID === trackID) {
      this.togglePlayPause();
    }
  };

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

  toggleAddToFavourites = (trackID: string) => {
    this.setState({
      favourites: [...this.state.favourites, trackID]
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <TopBar isUser={this.state.user} />
            {this.state.user ? (
              <div>
                <Layout>
                  <Sider
                    className="side-bar"
                    breakpoint="sm"
                    collapsedWidth="70"
                  >
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
                        path="/"
                        exact
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
