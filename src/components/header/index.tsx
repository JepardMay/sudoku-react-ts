import React, { useState } from 'react';
import { ArrowBack, EllipsisIcon } from '../Icons';
import Logo from '../logo/index';
import Modal from '../modal';
import Settings from '../settings';

import { HeaderContainer, HeaderWrapper, BackBtn, Difficulty, SettingsBtn } from './styles';

interface Props {
  setResume: (resume: boolean) => void;
  setGame: (view: boolean) => void;
  difficulty: string;
  validateEntireGrid: () => void;
  handleSolvingSudoku: () => void;
}

function Header({
  setResume,
  setGame,
  difficulty,
  validateEntireGrid,
  handleSolvingSudoku,
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
        />
      </Modal>
    </HeaderContainer>
  );
}

export default Header;
