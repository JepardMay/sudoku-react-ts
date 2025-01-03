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
  const [difficulty, setDifficulty] = useState<string>('random');
  const [error, setError] = useState<string | null>(null);

  const startNewGame = useCallback((difficulty: string) => {
    localStorage.removeItem('sudokuState');
    setDifficulty(difficulty);
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
        <Grid
          resume={ resume }
          setResume={ setResume }
          setGame={ setGame }
          setError={ setError }
          difficulty={ difficulty }
        /> :
        <Main
          resume={ resume }
          startNewGame={ startNewGame }
          resumeGame={ resumeGame }
          error={ error }
          setError={ setError }
        />
      }
    </Container>
  );
}

export default App;
