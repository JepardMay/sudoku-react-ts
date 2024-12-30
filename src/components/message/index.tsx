import React from 'react';
import Confetti from 'react-confetti-boom';

import { MessageContainer, MessageWrapper, Btn } from './styles';

interface Props {
  setGame: (view: boolean) => void;
}

const Message = ({setGame}: Readonly<Props>) => {
  return (
    <MessageContainer>
      <MessageWrapper>
        <h2>Congratulations!</h2>
        <p>You have successfully completed the Sudoku puzzle.</p>
        <Btn onClick={ () => setGame(false)}>Back to Main</Btn>
      </MessageWrapper>
      <Confetti mode="boom" particleCount={ 50 } effectInterval={ 1000 } effectCount={ 3 } />
    </MessageContainer>
  );
};

export default Message;
