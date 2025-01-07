import React, { useState } from 'react';
import { SudokuData } from '../../models';
import { ArrowBack, EllipsisIcon, ArrowAlt } from '../Icons';
import Logo from '../logo/index';
import Modal from '../modal';
import Settings from '../settings';

import { HeaderContainer, HeaderWrapper, BackBtn, Difficulty, SettingsBtn, UndoBtn, RedoBtn } from './styles';

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
}

function Header({
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
}: Readonly<Props>) {
  const [settingsModal, setSettingsModal] = useState<boolean>(false);

  return (
    <HeaderContainer>
      <BackBtn onClick={ () => {
        setGame(false);
        setResume(true);
      }}>
        <ArrowBack />
      </BackBtn>
      <HeaderWrapper>
        <UndoBtn onClick={ undo } disabled={ history.length === 0 }>
          <ArrowAlt />
        </UndoBtn>
        <RedoBtn onClick={redo} disabled={ redoStack.length === 0 }>
          <ArrowAlt />
        </RedoBtn>
        <Logo />
        <Difficulty className={difficulty.toLowerCase()}>
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
          <img src="./img/lock.png" alt="Lock" width="32" height="32" />
        </Difficulty>
        <SettingsBtn onClick={() => setSettingsModal(!settingsModal)}>
          <EllipsisIcon />
        </SettingsBtn>
      </HeaderWrapper>
      <Modal show={settingsModal} onClose={ () => setSettingsModal(false) }>
        <Settings 
          setSettingsModal={setSettingsModal} 
          validateEntireGrid={validateEntireGrid}
          handleSolvingSudoku={handleSolvingSudoku}
          isHighlighting={isHighlighting}
          setIsHighlighting={setIsHighlighting}
          getHint={getHint}
          reset={reset}
        />
      </Modal>
    </HeaderContainer>
  );
}

export default Header;
