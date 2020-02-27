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
  isPlaying: boolean;
  isFavourite: boolean;
  playHistory: string[];
  user: any;
  favourites: ITrack[];
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
    favourites: [],
    activeTrackID: undefined,
    isPlaying: false,
    isFavourite: false,
    playHistory: [],
    user: {}
  };

  componentWillMount() {
    const localStorageItem = localStorage.getItem("tracks");
    if (localStorageItem) {
      this.setState({ tracks: JSON.parse(localStorageItem) });
    }
  }
  toggleAddFavourite = (track: ITrack) => {
    const { favourites } = this.state;
    if (
      !favourites.find(alreadyFavourite => alreadyFavourite.id === track.id)
    ) {
      this.setState({ favourites: [...this.state.favourites, track] });

      console.log(this.state.favourites);
    } else {
      this.setState({
        favourites: favourites.filter(favTrack => favTrack.id !== track.id)
      });
    }
  };

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
    this.setState({ isPlaying: true });
    if (this.state.activeTrackID === trackID) {
      this.togglePlayPause();
    }
  };

  togglePlayPause = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
    if (this.state.activeTrackID === undefined) {
      this.setState({ activeTrackID: this.state.tracks[0].id });
    }
    let audio = document.querySelector("audio");
    if (audio) {
      this.state.isPlaying ? audio.pause() : audio.play();
    }
  };

  handlePlayPrev = () => {
    if (this.state.playHistory.length > 0) {
      this.setState({ activeTrackID: this.state.playHistory.pop() });
      this.setState({ isPlaying: true });
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
    this.setState({ isPlaying: true });
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
                            onAddFav={this.toggleAddFavourite}
                            isPlaying={this.state.isPlaying}
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
                            onAddFav={this.toggleAddFavourite}
                            isPlaying={this.state.isPlaying}
                          />
                        )}
                      />
                      <Route
                        path="/collection"
                        render={Props => (
                          <Collection
                            tracks={this.state.tracks}
                            favourites={this.state.favourites}
                            activeTrackID={this.state.activeTrackID}
                            onTrackClick={this.handleSetActiveTrack}
                            onAddFav={this.toggleAddFavourite}
                            isPlaying={this.state.isPlaying}
                          />
                        )}
                      />
                    </Switch>
                  </Content>
                </Layout>
                <BottomBar
                  activeTrack={this.state.tracks.find(
                    track => track.id === this.state.activeTrackID
                  )}
                  isPlaying={this.state.isPlaying}
                  // onAddFav={this.toggleAddFavourite}
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
