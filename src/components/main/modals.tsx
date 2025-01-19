import React from 'react';
import { Difficulty } from '../../models';
import Modal from '../modal';
import History from '../history';

import { BtnGrid, SmallBtn } from './styles';

interface DifficultyModalProps {
  show: boolean;
  onClose: () => void;
  startNewGame: (difficulty: Difficulty) => void;
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
      <SmallBtn onClick={() => startNewGame('expert')}>Expert</SmallBtn>
      <SmallBtn onClick={() => startNewGame(undefined)}>Random</SmallBtn>
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

interface HistoryModalProps {
  show: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ show, onClose }) => (
  <Modal
    show={show}
    onClose={onClose}
  >
    <History/>
  </Modal>
);
