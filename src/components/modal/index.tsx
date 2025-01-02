import React from 'react';
import Confetti from 'react-confetti-boom';

import { ModalContainer, ModalWrapper, Btn } from './styles';

interface Props {
  title: string;
  message?: string;
  btnText?: string;
  onClose: () => void;
  showConfetti?: boolean;
  children?: React.ReactNode;
}

const Modal = ({ title, message, btnText, onClose, showConfetti = false, children }: Readonly<Props>) => {
  return (
    <ModalContainer>
      <ModalWrapper>
        <h2>{title}</h2>
        { message && <p>{ message }</p> }
        {children}
        <Btn onClick={onClose}>{btnText}</Btn>
      </ModalWrapper>
      { showConfetti && <Confetti mode="boom" particleCount={ 50 } effectInterval={ 1000 } effectCount={ 3 } /> }
    </ModalContainer>
  );
};

export default Modal;
