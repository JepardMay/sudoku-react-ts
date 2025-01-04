import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Confetti from 'react-confetti-boom';
import { CloseIcon } from '../Icons';

import { ModalContainer, ModalWrapper, CloseBtn } from './styles';

interface Props {
  title?: string;
  message?: string;
  onClose: () => void;
  showConfetti?: boolean;
  children?: React.ReactNode;
  show: boolean;
}

const Modal = ({ title, message, onClose, showConfetti = false, children, show }: Readonly<Props>) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      nodeRef={nodeRef}
      classNames="modal"
      unmountOnExit
    >
      <ModalContainer ref={nodeRef}>
        <ModalWrapper className="modal-wrapper">
          { title && <h2>{ title }</h2> }
          { message && <p>{ message }</p> }
          {children}
          <CloseBtn onClick={ onClose } aria-label='Close Modal'>
            <CloseIcon/>
          </CloseBtn>
        </ModalWrapper>
        { showConfetti && <Confetti mode="boom" particleCount={ 50 } effectInterval={ 1000 } effectCount={ 3 } /> }
      </ModalContainer>
    </CSSTransition>
  );
};

export default Modal;
