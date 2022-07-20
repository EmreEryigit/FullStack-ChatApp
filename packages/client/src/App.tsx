import React from 'react';
import ToggleColorModeButton from './components/ToggleColorModeButton';
import Views from './components/Views';
import socket from './socket';

function App() {
  socket.connect()
  return (
    
    <div className="App">
      <Views/>
      <ToggleColorModeButton />
    </div>
  );
}

export default App;
