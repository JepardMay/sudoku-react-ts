import React, { useState } from 'react';
import Main from '../main/index';
import Grid from '../grid/index';

import './index.css';

function App() {
  const [game, setGame] = useState<boolean>(false);

  return (
    <div className="App">{ game ?
      <Grid setGame={ setGame } /> :
      <Main setGame={ setGame } /> }
    </div>
  );
}

export default App;
