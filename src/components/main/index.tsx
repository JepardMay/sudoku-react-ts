import React from 'react';
import Logo from '../logo';

import { MainBtn } from './styles';

interface Props {
  setGame: (view: boolean) => void;
}

function Main({ setGame }: Readonly<Props>) {
  return (
    <div>
      <Logo mod='big' />
      <MainBtn onClick={ () => setGame(true) }>Play</MainBtn>
    </div>
  );
}

export default Main;
