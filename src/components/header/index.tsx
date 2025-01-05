import React, { useState } from 'react';
import { ArrowBack, EllipsisIcon } from '../Icons';
import Logo from '../logo/index';
import Modal from '../modal';
import Settings from '../settings';

import { HeaderContainer, HeaderWrapper, BackBtn, Difficulty, SettingsBtn } from './styles';

interface Props {
  setResume: React.Dispatch<React.SetStateAction<boolean>>;
  setGame: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: string;
  validateEntireGrid: () => void;
  handleSolvingSudoku: () => void;
  isHighlighting: boolean;
  setIsHighlighting: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({
  setResume,
  setGame,
  difficulty,
  validateEntireGrid,
  handleSolvingSudoku,
  isHighlighting,
  setIsHighlighting,
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
        />
      </Modal>
    </HeaderContainer>
  );
}

export default Header;
