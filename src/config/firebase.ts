import firebase from "firebase";
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB5e-Rrpy7djS2XQhu10xm8v2jaf1YhlM8",
  authDomain: "spotify-player-react.firebaseapp.com",
  databaseURL: "https://spotify-player-react.firebaseio.com",
  projectId: "spotify-player-react",
  storageBucket: "spotify-player-react.appspot.com",
  messagingSenderId: "119673124647",
  appId: "1:119673124647:web:5f684cc3de255fede1db02"
};

firebase.initializeApp(firebaseConfig);

export const Database = firebase.firestore();
export const Storage = firebase.storage();
