import React, { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Difficulty, ACTION_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import Logo from '../logo';
import { DifficultyModal, ErrorModal, HistoryModal } from './modals';
import { removeSavedStorage } from '../../utils/storageUtils';
import { openGameSound } from '../../utils/soundUtils';

import { MainBtn } from './styles';

function Main() {
  const { state, dispatch } = useInitializeState();
  const { resume, error, timeHistory, bestTimeHistory } = state;

  const [difficultyModal, setDifficultyModal] = useState<boolean>(false);
  const [historyModal, setHistoryModal] = useState<boolean>(false);

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
      { resume && <MainBtn className='slide-in' onClick={resumeGame}>Resume Game</MainBtn> }
      <MainBtn className='slide-in' onClick={() => setDifficultyModal(true)}>New Game</MainBtn>
      { (timeHistory.length > 0 || bestTimeHistory.length > 0) && <MainBtn className='slide-in' onClick={ () => setHistoryModal(true) }>History</MainBtn> }
      <DifficultyModal
        show={difficultyModal && !error}
        onClose={() => setDifficultyModal(false)}
        startNewGame={startNewGame}
      />
      <ErrorModal
        show={!!error}
        onClose={() => dispatch({ type: ACTION_TYPE.SET_ERROR, payload: null })}
      />
      <HistoryModal
        show={historyModal && !error}
        onClose={() => setHistoryModal(false)}
      />
    </div>
  );
}

export default Main;
