import Player from "./components/player";
import Search from "./components/search";
import React, { useState } from 'react';

function App() {
  const [audioID, setAudioID] = useState(0);
  const selectedAudio = (data) => {
    setAudioID(data);
  }

  return (
    <div className="App">
      <Player audioID={audioID}></Player>
      <Search selectedAudio={selectedAudio}></Search>
    </div>
  );
}

export default App;