import React, { useState } from "react";
import "./FileUpload.scss";

import { Database, Storage } from "../../config/firebase";

export const FileUpload: React.FC = () => {
  const [song, setSong] = useState<any>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      const fileType = selectedFile["type"];
      const validFileTypes = ["audio/mp3"];
      if (validFileTypes.includes(fileType)) {
        setError("");
        setSong(selectedFile);
      } else {
        console.log("error");
        setError("Please upload an mp3 file");
      }
    }
  };

  const handleUpload = () => {
    if (song) {
      const uploadTask = Storage.ref("audioFiles/" + song.name).put(song);
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error: any) => {
          setError(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            song.url = downloadURL;
            console.log(song.name);
            console.log(song.url);
            setProgress(0);
            Database.collection("files")
              .add({
                id: "",
                artist: "",
                album: "",
                time: "",
                url: song.url,
                title: song.name
              })
              .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
          });
        }
      );
    } else {
      setError("Please select an audio to upload");
    }
  };

  return (
    <div className="FileUpload">
      <input type="file" onChange={handleChange} />

      <button onClick={handleUpload} style={{ color: "black" }}>
        Upload
      </button>
      <div className="error-message" style={{ height: "100px" }}>
        {progress > 0 ? <progress value={progress} max={100} /> : ""}

        <p style={{ color: "red" }}>{error}</p>
      </div>
    </div>
  );
};
