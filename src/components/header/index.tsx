import React, { useState } from 'react';
import { ACTION_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import { ArrowBack } from '../Icons';
import Logo from '../logo/index';
import { SettingsModal } from './modals';
import { UndoButton, RedoButton, SettingsButton } from './buttons';
import { formatTime } from '../../utils/formatUtils';
import { closeGameSound } from '../../utils/soundUtils';

import { HeaderContainer, HeaderWrapper, BackBtn, Difficulty, Timer } from './styles';

interface Props {
  validateEntireGrid: () => void;
  handleSolvingSudoku: () => void;
  getHint: () => void;
  reset: () => void;
  resetPencilMarks: () => void;
  undo: () => void;
  redo: () => void;
}

function Header ({
  validateEntireGrid,
  handleSolvingSudoku,
  getHint,
  reset,
  resetPencilMarks,
  undo, 
  redo,
}: Readonly<Props>) {
  const [settingsModal, setSettingsModal] = useState<boolean>(false);

  const { state, dispatch } = useInitializeState();
  const { history, redoStack, grid, timeSpent, timerHidden } = state;

  const handleBackClick = () => {
    dispatch({ type: ACTION_TYPE.SET_GAME, payload: false });
    dispatch({ type: ACTION_TYPE.SET_RESUME, payload: true });
    closeGameSound();
  };

  const handleSettingsClick = () => {
    setSettingsModal(!settingsModal);
  };

  return (
    <HeaderContainer>
      <BackBtn className='back-btn' onClick={handleBackClick}>
        <ArrowBack />
      </BackBtn>
      <HeaderWrapper>
        <UndoButton onClick={undo} disabled={history.length === 0} />
        <RedoButton onClick={redo} disabled={redoStack.length === 0} />
        <Logo />
        <Difficulty className={grid.difficulty?.toLowerCase()}>
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
        </Difficulty>
        <SettingsButton onClick={handleSettingsClick} />
        { !timerHidden && <Timer>{ formatTime(timeSpent) }</Timer> }
      </HeaderWrapper>
      <SettingsModal
        show={settingsModal}
        onClose={() => setSettingsModal(false)}
        validateEntireGrid={validateEntireGrid}
        handleSolvingSudoku={handleSolvingSudoku}
        getHint={getHint}
        reset={ reset }
        resetPencilMarks={resetPencilMarks}
      />
    </HeaderContainer>
  );
}

export default Header;
