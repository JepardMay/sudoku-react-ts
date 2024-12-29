import React, { useState, useCallback } from 'react';
import Main from '../main/index';
import Grid from '../grid/index';

import { Container } from './styles';

function App() {
  const [game, setGame] = useState<boolean>(false);
  const [resume, setResume] = useState<boolean>(() => {
    const savedState = localStorage.getItem('sudokuState');
    return !!savedState;
  });

  const startNewGame = useCallback(() => {
    localStorage.removeItem('sudokuState');
    setResume(false);
    setGame(true);
  }, []);

  const resumeGame = useCallback(() => {
    setResume(true);
    setGame(true);
  }, []);

  return (
    <Container>
      { game ?
        <Grid resume={resume} setResume={setResume} setGame={setGame} /> :
        <Main resume={resume} startNewGame={startNewGame} resumeGame={resumeGame} />
      }
    </Container>
  );
}

export default App;
