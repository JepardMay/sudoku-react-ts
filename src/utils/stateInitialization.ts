import { LocalStorageState, Grid, INPUT_TYPE } from '../models';
import { getStorage } from './storageUtils';

export const loadStateFromLocalStorage = (): LocalStorageState => {
  return getStorage<LocalStorageState>('sudokuAppState', {
    grid: null,
    inputType: INPUT_TYPE.DIGIT_FIRST,
    timeSpent: 0,
    nightTheme: !!window.matchMedia('(prefers-color-scheme: dark)').matches,
    highlighting: false,
    timerHidden: false,
    timeHistory: [],
    bestTimeHistory: null,
    isHelperUsed: false,
  });
};

export const initialGridState = (): Grid => {
  const savedState = loadStateFromLocalStorage().grid;
  return savedState || {
    difficulty: undefined,
    solution: [[0]],
    puzzle: Array.from({ length: 9 }, () => 
      Array.from({ length: 9 }, () => ({ value: 0, pencilMarks: [] }))
    )
  };
};

export const checkSavedGrid = (): boolean => {
  return !!loadStateFromLocalStorage().grid?.difficulty;
};
