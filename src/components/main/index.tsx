import React, { useState } from 'react';
import { Difficulty, ACTION_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import Logo from '../logo';
import { DifficultyModal, ErrorModal } from './modals';
import { removeSavedStorage } from '../../utils/storageUtils';
import { openGameSound } from '../../utils/soundUtils';

import { MainBtn } from './styles';

function Main() {
  const { state, dispatch } = useInitializeState();
  const { resume, error } = state;

  const [difficultyModal, setDifficultyModal] = useState<boolean>(false);

  const startNewGame = (difficulty: Difficulty) => {
    removeSavedStorage('sudokuState');
    dispatch({ type: ACTION_TYPE.SET_DIFFICULTY, payload: difficulty });
    dispatch({ type: ACTION_TYPE.SET_RESUME, payload: false });
    dispatch({ type: ACTION_TYPE.SET_GAME, payload: true });
    openGameSound();
  };

  const resumeGame = () => {
    dispatch({ type: ACTION_TYPE.SET_RESUME, payload: true });
    dispatch({ type: ACTION_TYPE.SET_GAME, payload: true });
    openGameSound();
  };

  return (
    <div>
      <Logo mod='big' />
      {resume && <MainBtn onClick={resumeGame}>Resume Game</MainBtn>}
      <MainBtn onClick={() => setDifficultyModal(true)}>New Game</MainBtn>
      <DifficultyModal
        show={difficultyModal && !error}
        onClose={() => setDifficultyModal(false)}
        startNewGame={startNewGame}
      />
      <ErrorModal
        show={!!error}
        onClose={() => dispatch({ type: ACTION_TYPE.SET_ERROR, payload: null })}
      />
    </div>
  );
}

export default Main;
