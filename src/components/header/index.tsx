import React, { useState } from 'react';
import { SudokuData } from '../../models';
import { ArrowBack } from '../Icons';
import Logo from '../logo/index';
import { SettingsModal } from './modals';
import { UndoButton, RedoButton, SettingsButton } from './buttons';
import { formatTime } from '../utils/formatUtils';

import { HeaderContainer, HeaderWrapper, BackBtn, Difficulty, Timer } from './styles';

interface Props {
  setResume: React.Dispatch<React.SetStateAction<boolean>>;
  setGame: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: string;
  validateEntireGrid: () => void;
  handleSolvingSudoku: () => void;
  isHighlighting: boolean;
  setIsHighlighting: React.Dispatch<React.SetStateAction<boolean>>;
  getHint: () => void;
  reset: () => void;
  history: SudokuData[];
  redoStack: SudokuData[];
  undo: () => void;
  redo: () => void;
  nightTheme: boolean;
  setNightTheme: React.Dispatch<React.SetStateAction<boolean>>;
  timeSpent: number;
}

function Header ({
  setResume,
  setGame,
  difficulty,
  validateEntireGrid,
  handleSolvingSudoku,
  isHighlighting,
  setIsHighlighting,
  getHint,
  reset,
  history,
  redoStack,
  undo, 
  redo,
  nightTheme,
  setNightTheme,
  timeSpent,
}: Readonly<Props>) {
  const [settingsModal, setSettingsModal] = useState<boolean>(false);
  const [isTimerHidden, setIsTimerHidden] = useState<boolean>(false);

  const handleBackClick = () => {
    setGame(false);
    setResume(true);
  };

  const handleSettingsClick = () => {
    setSettingsModal(!settingsModal);
  };

  return (
    <HeaderContainer>
      <BackBtn onClick={handleBackClick}>
        <ArrowBack />
      </BackBtn>
      <HeaderWrapper>
        <UndoButton onClick={undo} disabled={history.length === 0} />
        <RedoButton onClick={redo} disabled={redoStack.length === 0} />
        <Logo />
        <Difficulty className={difficulty.toLowerCase()}>
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
        </Difficulty>
        <SettingsButton onClick={handleSettingsClick} />
        { !isTimerHidden && <Timer>{ formatTime(timeSpent) }</Timer> }
      </HeaderWrapper>
      <SettingsModal
        show={settingsModal}
        onClose={() => setSettingsModal(false)}
        validateEntireGrid={validateEntireGrid}
        handleSolvingSudoku={handleSolvingSudoku}
        isHighlighting={isHighlighting}
        setIsHighlighting={setIsHighlighting}
        getHint={getHint}
        reset={reset}
        nightTheme={nightTheme}
        setNightTheme={setNightTheme}
        isTimerHidden={isTimerHidden}
        setIsTimerHidden={setIsTimerHidden}
      />
    </HeaderContainer>
  );
}

export default Header;
