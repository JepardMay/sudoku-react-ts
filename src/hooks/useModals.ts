import { useState } from 'react';

export const useModals = () => {
  const [difficultyModal, setDifficultyModal] = useState<boolean>(false);
  const [historyModal, setHistoryModal] = useState<boolean>(false);
  const [settingsModal, setSettingsModal] = useState<boolean>(false);

  return {
    difficultyModal,
    historyModal,
    settingsModal,
    openDifficultyModal: () => setDifficultyModal(true),
    closeDifficultyModal: () => setDifficultyModal(false),
    openHistoryModal: () => setHistoryModal(true),
    closeHistoryModal: () => setHistoryModal(false),
    openSettingsModal: () => setSettingsModal(true),
    closeSettingsModal: () => setSettingsModal(false),
  };
};
