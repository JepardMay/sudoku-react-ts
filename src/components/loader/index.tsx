import React from 'react';

import './index.css';

interface Props {
  loading: boolean;
}

function Loader({ loading }: Props) {
  return (
    <div className={loading ? 'Loader Loader_animate' : 'Loader'}>
      <img src="./img/letters/u-2.png" alt="U" />
      <img src="./img/letters/k.png" alt="K" />
      <img src="./img/letters/o.png" alt="O" />
      <img src="./img/letters/d.png" alt="D" />
      <img src="./img/letters/u-1.png" alt="U" />
      <img src="./img/letters/s.png" alt="S" />
    </div>
  );
}

export default Loader;
