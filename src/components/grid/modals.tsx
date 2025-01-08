import React from 'react';
import Modal from '../modal';
import { Btn } from './styles';
import { formatTime } from '../utils/formatUtils';

interface CompletionModalProps {
  show: boolean;
  timeSpent: number;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ show, timeSpent, onClose }) => (
  <Modal
    show={show}
    title="Congratulations!"
    message={ `You have successfully completed the Sudoku puzzle in ${formatTime(timeSpent)}` }
    onClose={onClose}
    showConfetti
  >
    <Btn onClick={onClose}>Back to Main</Btn>
  </Modal>
);
