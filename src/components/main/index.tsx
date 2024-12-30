import React from 'react';
import Logo from '../logo';

import { MainBtn } from './styles';

interface Props {
  resume: boolean;
  startNewGame: () => void;
  resumeGame: () => void;
}

function Main({
  resume,
  startNewGame,
  resumeGame
}: Readonly<Props>) {
  return (
    <div>
      <Logo mod='big' />
      { resume && <MainBtn onClick={ resumeGame }>Resume Game</MainBtn> }
      <MainBtn onClick={ startNewGame }>New Game</MainBtn>
    </div>
  );
}

export default Main;
