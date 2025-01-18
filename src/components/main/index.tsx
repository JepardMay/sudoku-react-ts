import React, { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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
    dispatch({ type: ACTION_TYPE.SET_IS_COMPLETED, payload: false });
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

  useGSAP(() => {
    gsap.from('.slide-in', {
      y: 100,
      z: -100,
      opacity: 0,
      stagger: 0.3
    });
  });

  return (
    <div>
      <Logo mod='slide-in big' />
      {resume && <MainBtn className='slide-in' onClick={resumeGame}>Resume Game</MainBtn>}
      <MainBtn className='slide-in' onClick={() => setDifficultyModal(true)}>New Game</MainBtn>
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
