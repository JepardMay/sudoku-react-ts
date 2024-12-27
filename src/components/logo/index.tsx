import React from 'react';

import { LogoContainer } from './styles';

interface Props {
  mod?: string;
}

function Logo({ mod }: Readonly<Props>) {
  return (
    <LogoContainer className={mod}>
      <img src="./img/sudoku.png" alt="Sudoku" width="384" height="128" />
    </LogoContainer>
  );
}

export default Logo;
