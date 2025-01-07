import React from 'react';
import Modal from '../modal';
import Settings from '../settings';

interface SettingsModalProps {
  show: boolean;
  onClose: () => void;
  validateEntireGrid: () => void;
  handleSolvingSudoku: () => void;
  isHighlighting: boolean;
  setIsHighlighting: React.Dispatch<React.SetStateAction<boolean>>;
  getHint: () => void;
  reset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  show, 
  onClose, 
  validateEntireGrid, 
  handleSolvingSudoku, 
  isHighlighting, 
  setIsHighlighting, 
  getHint, 
  reset
}) => (
  <Modal show={show} onClose={onClose}>
    <Settings 
      setSettingsModal={onClose} 
      validateEntireGrid={validateEntireGrid}
      handleSolvingSudoku={handleSolvingSudoku}
      isHighlighting={isHighlighting}
      setIsHighlighting={setIsHighlighting}
      getHint={getHint}
      reset={reset}
    />
  </Modal>
);
