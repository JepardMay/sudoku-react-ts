import React from 'react';

import { LoaderContainer } from './styles';

interface Props {
  loading: boolean;
}

function Loader({ loading }: Readonly<Props>) {
  const lettersSrc = ['u-2', 'k', 'o', 'd', 'u-1', 's'];
  const letters = ['U', 'K', 'O', 'D', 'U', 'S'];

  return (
    <LoaderContainer loading={loading}>
      {letters.map((letter, index) => (
        <img key={lettersSrc[index]} src={`./img/letters/${lettersSrc[index]}.png`} alt={letter} />
      ))}
    </LoaderContainer>
  );
}

export default Loader;
