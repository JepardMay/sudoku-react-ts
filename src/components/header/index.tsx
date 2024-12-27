import React from 'react';
import { ArrowBack } from '../Icons';
import Logo from '../logo/index';

import { HeaderContainer, BackBtn, Difficulty } from './styles';

interface Props {
  setGame: (view: boolean) => void;
  difficulty: string;
}

function Header({ setGame, difficulty }: Readonly<Props>) {
  return (
    <HeaderContainer>
      <BackBtn onClick={ () => setGame(false) }>
        <ArrowBack />
      </BackBtn>
      <Logo />
      <Difficulty className={difficulty.toLowerCase()}>
        <img src="./img/lock.png" alt="Lock" width="32" height="32" />
        <img src="./img/lock.png" alt="Lock" width="32" height="32" />
        <img src="./img/lock.png" alt="Lock" width="32" height="32" />
      </Difficulty>
    </HeaderContainer>
  );
}

export default Header;
