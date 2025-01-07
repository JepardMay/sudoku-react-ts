import React from 'react';
import Modal from '../modal';
import { BtnGrid, SmallBtn } from './styles';

interface DifficultyModalProps {
  show: boolean;
  onClose: () => void;
  startNewGame: (difficulty: string) => void;
}

export const DifficultyModal: React.FC<DifficultyModalProps> = ({ show, onClose, startNewGame }) => (
  <Modal
    show={show}
    title="Choose the difficulty level"
    onClose={onClose}
  >
    <BtnGrid>
      <SmallBtn onClick={() => startNewGame('easy')}>Easy</SmallBtn>
      <SmallBtn onClick={() => startNewGame('medium')}>Medium</SmallBtn>
      <SmallBtn onClick={() => startNewGame('hard')}>Hard</SmallBtn>
      <SmallBtn onClick={() => startNewGame('random')}>Random</SmallBtn>
    </BtnGrid>
  </Modal>
);

interface ErrorModalProps {
  show: boolean;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ show, onClose }) => (
  <Modal
    show={show}
    title="An error occurred"
    message="Try to start the game again"
    onClose={onClose}
  />
);
