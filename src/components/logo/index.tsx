import React from 'react';

import './index.css';

interface Props {
  mod?: string;
}

function Logo({ mod }: Props) {
  return (
    <div className={mod ? `Logo Logo_${mod}` : 'Logo'}>
      <img src="./img/sudoku.png" alt="Sudoku" width="384" height="128" />
    </div>
  );
}

export default Logo;
