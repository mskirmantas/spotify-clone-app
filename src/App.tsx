import React from "react";
import "./App.scss";
import Button from "antd/es/button";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello, Spotify</h1>
      <Button type="primary">Button</Button>
    </div>
  );
};

export default App;
