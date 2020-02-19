import React from "react";
import "./App.scss";
import { Database } from "./config/firebase";

// Components
import { TopBar } from "./components/TopBar";
import { Navigation } from "./components/Navigation";
import { Home } from "./containers/Home";
import { Search } from "./containers/Search";
import { Collection } from "./containers/Collection";
import { FileUpload } from "./containers/FileUpload";
import { BottomBar } from "./components/BottomBar";

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
}

interface ITrack {
  artist: string;
  album: string;
  id: string;
  time: string;
  title: string;
  url: string;
}

export default class App extends React.Component<Props, IState> {
  state: IState = {
    tracks: [],
    activeTrackID: undefined,
    playingStatus: false,
    playHistory: []
  };

  // Fetch DATA from DB: ------------------------------------------

  componentDidMount() {
    Database.collection("files")
      .get()
      .then(snapshot => {
        const musicFiles: any = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          musicFiles.push(data);
        });
        this.setState({
          tracks: musicFiles,
          activeTrackID:
            musicFiles[Math.floor(Math.random() * musicFiles.length)].id,
          playingStatus: false
        });
      })
      .catch(error => console.log(error));
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

  render() {
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
                        tracks={this.state.tracks}
                        activeTrackID={this.state.activeTrackID}
                        onTrackClick={this.handleSetActiveTrack}
                        isPlaying={this.state.playingStatus}
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
              activeTrack={this.state.tracks.find(
                track => track.id === this.state.activeTrackID
              )}
              isPlaying={this.state.playingStatus}
              onPlayPause={this.togglePlayPause}
              onPlayPrev={this.handlePlayPrev}
              onPlayNext={this.handlePlayNext}
            />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

// const App: React.FC = () => {
//   const [tracks, setTracks] = useState<ITrack[]>([]);
//   const [activeTrackID, setActiveTrackID] = useState<string | undefined>(
//     undefined
//   );
//   const [playingStatus, setPlayingStatus] = useState<boolean>(false);

//   const [playHistory, setPlayHistory] = useState<string[]>([]);

//   // Get Files from DB:
//   useEffect(() => {
//     Database.collection("files")
//       .get()
//       .then(snapshot => {
//         const musicFiles: any = [];
//         snapshot.forEach(doc => {
//           const data = doc.data();
//           musicFiles.push(data);
//         });
//         setTracks(musicFiles);
//       })
//       .catch(error => console.log(error));
//   }, []);

//   const togglePlayPause = () => {
//     setPlayingStatus(!playingStatus);
//     if (activeTrackID === undefined) {
//       setActiveTrackID(tracks[0].id);
//     }
//   };

//   //Set Active Track:
//   const handleSetActiveTrack = (trackID: string) => {
//     setActiveTrackID(trackID);
//     setPlayingStatus(true);
//     if (activeTrackID === trackID && playingStatus === true) {
//       setPlayingStatus(false);
//     }
//   };

//   const getActiveTrack = () => {
//     if (activeTrackID) {
//       return tracks.find(t => t.id === activeTrackID);
//     }
//   };
//   const activeTrack = getActiveTrack();

//   const handlePlayPrev = () => {
//     if (playHistory.length > 1) {
//       setActiveTrackID(playHistory.pop());
//     }
//   };

//   const handlePlayNext = () => {
//     if (activeTrackID) {
//       setPlayHistory([...playHistory, activeTrackID]);
//     }

//     let nextTrack: string;

//     do {
//       nextTrack = tracks[Math.floor(Math.random() * tracks.length)].id;
//     } while (
//       playHistory.length > 0 &&
//       playHistory[playHistory.length - 1] === nextTrack
//     );
//     setActiveTrackID(nextTrack);
//     setPlayingStatus(true);
//   };

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Layout>
//           <TopBar />
//           <Layout>
//             <Sider>
//               <Navigation />
//             </Sider>
//             <Content>
//               <Switch>
//                 <Route
//                   path="/home"
//                   render={Props => (
//                     <Home
//                       tracks={tracks}
//                       activeTrackID={activeTrackID}
//                       onTrackClick={handleSetActiveTrack}
//                       isPlaying={playingStatus}
//                     />
//                   )}
//                 />
//                 <Route path="/search" component={Search} />
//                 <Route path="/collection" component={Collection} />
//                 <Route path="/upload" component={FileUpload} />
//               </Switch>
//             </Content>
//           </Layout>
//           <BottomBar
//             activeTrack={activeTrack}
//             isPlaying={playingStatus}
//             onPlayBtnClick={togglePlayPause}
//             onPrevBtnClick={handlePlayPrev}
//             onNextBtnClick={handlePlayNext}
//           />
//         </Layout>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
