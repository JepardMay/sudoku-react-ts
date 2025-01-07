import React, { useState, useCallback, useEffect } from 'react';
import Main from '../main/index';
import Grid from '../grid/index';
import { checkSavedState, removeSavedState } from '../utils/stateInitialization';

import { Container } from './styles';

function App() {
  const [game, setGame] = useState<boolean>(false);
  const [resume, setResume] = useState<boolean>(checkSavedState);
  const [difficulty, setDifficulty] = useState<string>('random');
  const [error, setError] = useState<string | null>(null);
  const [nightTheme, setNightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('nightTheme');
    return savedTheme === 'true';
  });

  useEffect(() => {
    document.documentElement.className = nightTheme ? 'night-theme' : '';
    localStorage.setItem('nightTheme', String(nightTheme));
  }, [nightTheme]);

  const startNewGame = useCallback((difficulty: string) => {
    removeSavedState();
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
      {game ? (
        <Grid
          resume={resume}
          setResume={setResume}
          setGame={setGame}
          setError={setError}
          difficulty={difficulty}
          nightTheme={nightTheme}
          setNightTheme={setNightTheme}
        />
      ) : (
        <Main
          resume={resume}
          startNewGame={startNewGame}
          resumeGame={resumeGame}
          error={error}
          setError={setError}
        />
      )}
    </Container>
  );
}

export default App;
