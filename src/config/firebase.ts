import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDvLLqTNKrF7f4KFuPFlssUzTj43cMwVJQ",
  authDomain: "spotify-app-68cf3.firebaseapp.com",
  databaseURL: "https://spotify-app-68cf3.firebaseio.com",
  projectId: "spotify-app-68cf3",
  storageBucket: "spotify-app-68cf3.appspot.com",
  messagingSenderId: "33781073093",
  appId: "1:33781073093:web:57c37380b928281e891cac",
  measurementId: "G-Z7PY8BHMTQ"
};

export const Firebase = firebase.initializeApp(firebaseConfig);
export const DB = firebase.database();
export const Storage = firebase.storage();
