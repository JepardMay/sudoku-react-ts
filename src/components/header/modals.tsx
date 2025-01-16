import React from 'react';
import Modal from '../modal';
import Settings from '../settings';

interface SettingsModalProps {
  show: boolean;
  onClose: () => void;
  validateEntireGrid: () => void;
  handleSolvingSudoku: () => void;
  getHint: () => void;
  reset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  show, 
  onClose, 
  validateEntireGrid, 
  handleSolvingSudoku, 
  getHint, 
  reset,
}) => (
  <Modal show={show} onClose={onClose}>
    <Settings 
      setSettingsModal={onClose} 
      validateEntireGrid={validateEntireGrid}
      handleSolvingSudoku={handleSolvingSudoku}
      getHint={getHint}
      reset={reset}
    />
  </Modal>
);
