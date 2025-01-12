import React, { useState, useCallback, useEffect } from 'react';
import Main from '../main/index';
import Grid from '../grid/index';
import { checkSavedState } from '../../utils/stateInitialization';
import { setStorage, getStorage, removeSavedStorage } from '../../utils/storageUtils';
import { openGameSound } from '../../utils/soundUtils';

import { Container } from './styles';

function App() {
  const [game, setGame] = useState<boolean>(false);
  const [resume, setResume] = useState<boolean>(checkSavedState);
  const [difficulty, setDifficulty] = useState<string>('random');
  const [error, setError] = useState<string | null>(null);
  const [nightTheme, setNightTheme] = useState<boolean>(() => getStorage<boolean>('nightTheme', false));

  useEffect(() => {
    document.documentElement.className = nightTheme ? 'night-theme' : '';
    setStorage('nightTheme', String(nightTheme));
  }, [nightTheme]);

  const startNewGame = useCallback((difficulty: string) => {
    removeSavedStorage('sudokuState');
    setDifficulty(difficulty);
    setResume(false);
    setGame(true);
    openGameSound();
  }, []);

  const resumeGame = useCallback(() => {
    setResume(true);
    setGame(true);
    openGameSound();
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
