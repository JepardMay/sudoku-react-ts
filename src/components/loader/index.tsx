import React from 'react';
import useImagePreloader from '../../hooks/useImagePreloader';

import { LoaderContainer } from './styles';

interface Props {
  onLoadComplete: () => void;
}

function Loader({
  onLoadComplete,
}: Readonly<Props>) {
  const lettersSrc = ['u-2', 'k', 'o', 'd', 'u-1', 's'];
  const letters = ['U', 'K', 'O', 'D', 'U', 'S'];

  useImagePreloader(lettersSrc.map(src => `./img/letters/${src}.png`), onLoadComplete);

  return (
    <LoaderContainer>
      {letters.map((letter, index) => (
        <img key={lettersSrc[index]} src={`./img/letters/${lettersSrc[index]}.png`} alt={letter} />
      ))}
    </LoaderContainer>
  );
}

export default Loader;
