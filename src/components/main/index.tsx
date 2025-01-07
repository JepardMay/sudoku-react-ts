import React, { useState } from 'react';
import Logo from '../logo';
import { DifficultyModal, ErrorModal } from './modals';

import { MainBtn } from './styles';

interface Props {
  resume: boolean;
  startNewGame: (difficulty: string) => void;
  resumeGame: () => void;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

function Main({
  resume,
  startNewGame,
  resumeGame,
  error,
  setError,
}: Readonly<Props>) {
  const [difficultyModal, setDifficultyModal] = useState<boolean>(false);

  return (
    <div>
      <Logo mod='big' />
      {resume && <MainBtn onClick={resumeGame}>Resume Game</MainBtn>}
      <MainBtn onClick={() => setDifficultyModal(true)}>New Game</MainBtn>
      <DifficultyModal
        show={difficultyModal && !error}
        onClose={() => setDifficultyModal(false)}
        startNewGame={startNewGame}
      />
      <ErrorModal
        show={!!error}
        onClose={() => setError(null)}
      />
    </div>
  );
}

export default Main;
