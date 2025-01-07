// GridModals.tsx
import React from 'react';
import Modal from '../modal';
import { Btn } from './styles';

interface CompletionModalProps {
  show: boolean;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ show, onClose }) => (
  <Modal
    show={show}
    title="Congratulations!"
    message="You have successfully completed the Sudoku puzzle."
    onClose={onClose}
    showConfetti
  >
    <Btn onClick={onClose}>Back to Main</Btn>
  </Modal>
);
