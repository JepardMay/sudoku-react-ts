import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: var(--overlay-color);

  &.modal-enter {
    opacity: 0;
  }

  &.modal-enter .modal-wrapper {
    transform: translateY(50px);
  }

  &.modal-enter-active {
    opacity: 1;
    transition: opacity var(--modal-transition);
  }

  &.modal-enter-active .modal-wrapper {
    transform: translateY(0);
    transition: transform var(--modal-transition);
  }

  &.modal-exit {
    opacity: 1;
  }

  &.modal-exit .modal-wrapper {
    transform: translateY(0);
  }

  &.modal-exit-active {
    opacity: 0;
    transition: opacity var(--modal-transition);
  }

  &.modal-exit-active .modal-wrapper {
    transform: translateY(50px);
    transition: transform var(--modal-transition);
  }
`;

export const ModalWrapper = styled.div`
  position: relative;
  max-width: 350px;
  width: 100%;
  padding: 30px;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px; 
  height: 40px; 
  padding: 5px;
  color: var(--text-color);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color var(--default-transition);

  svg {
    width: 100%;
    height: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover { 
      color: var(--border-color);
    }
  }
`; 
