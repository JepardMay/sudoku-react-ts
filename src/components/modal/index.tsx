import React from 'react';
import Confetti from 'react-confetti-boom';
import { CloseIcon } from '../Icons';

import { ModalContainer, ModalWrapper, CloseBtn } from './styles';

interface Props {
  title?: string;
  message?: string;
  onClose: () => void;
  showConfetti?: boolean;
  children?: React.ReactNode;
}

const Modal = ({ title, message, onClose, showConfetti = false, children }: Readonly<Props>) => {
  return (
    <ModalContainer>
      <ModalWrapper>
        { title && <h2>{ title }</h2> }
        { message && <p>{ message }</p> }
        {children}
        <CloseBtn onClick={ onClose } aria-label='Close Modal'>
          <CloseIcon/>
        </CloseBtn>
      </ModalWrapper>
      { showConfetti && <Confetti mode="boom" particleCount={ 50 } effectInterval={ 1000 } effectCount={ 3 } /> }
    </ModalContainer>
  );
};

export default Modal;
