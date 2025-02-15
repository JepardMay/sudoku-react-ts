import React from 'react';
import { Difficulty, ACTION_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import { useModals } from '../../hooks/useModals';
import { useAnimations } from '../../hooks/useAnimations';
import Logo from '../logo';
import { DifficultyModal, ErrorModal, HistoryModal } from './modals';
import { removeSavedStorage } from '../../utils/storageUtils';
import { openGameSound } from '../../utils/soundUtils';

import { MainBtn } from './styles';

function Main() {
  const { state, dispatch } = useInitializeState();
  const { resume, error, timeHistory, mute } = state;

  const { difficultyModal, historyModal, openDifficultyModal, closeDifficultyModal, openHistoryModal, closeHistoryModal } = useModals();

  const startNewGame = (difficulty: Difficulty) => {
    removeSavedStorage('sudokuState');
    dispatch({ type: ACTION_TYPE.SET_IS_COMPLETED, payload: false });
    dispatch({ type: ACTION_TYPE.SET_DIFFICULTY, payload: difficulty });
    dispatch({ type: ACTION_TYPE.SET_RESUME, payload: false });
    dispatch({ type: ACTION_TYPE.SET_IS_HELPER_USED, payload: false });
    dispatch({ type: ACTION_TYPE.SET_GAME, payload: true });
    openGameSound(mute)();
  };

  const resumeGame = () => {
    dispatch({ type: ACTION_TYPE.SET_RESUME, payload: true });
    dispatch({ type: ACTION_TYPE.SET_GAME, payload: true });
    openGameSound(mute)();
  };

  useAnimations({ slideIn: true });

  return (
    <div>
      <Logo mod='slide-in big' />
      { resume && <MainBtn className='slide-in' onClick={resumeGame}>Resume Game</MainBtn> }
      <MainBtn className='slide-in' onClick={openDifficultyModal}>New Game</MainBtn>
      { (timeHistory.length > 0) && <MainBtn className='slide-in' onClick={openHistoryModal}>History</MainBtn> }
      <DifficultyModal
        show={difficultyModal && !error}
        onClose={closeDifficultyModal}
        startNewGame={startNewGame}
      />
      <ErrorModal
        show={!!error}
        onClose={() => dispatch({ type: ACTION_TYPE.SET_ERROR, payload: null })}
      />
      <HistoryModal
        show={historyModal && !error}
        onClose={closeHistoryModal}
      />
    </div>
  );
}

export default Main;
