import React, {useState} from 'react';
import Logo from '../logo';
import Modal from '../modal';

import { MainBtn, BtnGrid, SmallBtn } from './styles';

interface Props {
  resume: boolean;
  startNewGame: (difficulty: string) => void;
  resumeGame: () => void;
  error: string | null;
  setError: (state: string | null) => void;
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
      { resume && <MainBtn onClick={ resumeGame }>Resume Game</MainBtn> }
      <MainBtn onClick={ () => setDifficultyModal(true) }>New Game</MainBtn>
      {(difficultyModal && !error) && <Modal
        title='Choose  the difficulty level'
        onClose={ () => setDifficultyModal(false) }>
        <BtnGrid>
          <SmallBtn onClick={() => startNewGame('easy')}>Easy</SmallBtn>
          <SmallBtn onClick={() => startNewGame('medium')}>Medium</SmallBtn>
          <SmallBtn onClick={() => startNewGame('hard')}>Hard</SmallBtn>
          <SmallBtn onClick={() => startNewGame('random')}>Random</SmallBtn>
        </BtnGrid>
      </Modal>
      }
      {error && <Modal
        title='An error occurred'
        message='Please try to start the again'
        onClose={ () => setError(null) }>
      </Modal>
      }
    </div>
  );
}

export default Main;
