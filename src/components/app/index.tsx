import React, { useState } from 'react';
import Main from '../main/index';
import Grid from '../grid/index';

import { Container } from './styles';

function App() {
  const [game, setGame] = useState<boolean>(false);

  return (
    <Container>
      { game ?
        <Grid setGame={ setGame } /> :
        <Main setGame={ setGame } />
      }
    </Container>
  );
}

export default App;
