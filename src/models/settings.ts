export enum INPUT_TYPE {
  DIGIT_FIRST = 'Digit first',
  CELL_FIRST = 'Cell first',
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | undefined;

export interface SettingsActions {
  validateEntireGrid: () => void;
  setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSolvingSudoku: () => void;
  getHint: () => void;
  reset: () => void;
  resetPencilMarks: () => void;
}
