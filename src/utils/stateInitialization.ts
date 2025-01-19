import { Grid } from '../models';
import { getStorage } from './storageUtils';

export const loadStateFromLocalStorage = (): Grid | null => {
  return getStorage<Grid | null>('sudokuState', null);
};

export const initialSudokuState = (): Grid => {
  const savedState = loadStateFromLocalStorage();
  return savedState || {
    difficulty: undefined,
    solution: [[0]],
    puzzle: Array.from({ length: 9 }, () => 
      Array.from({ length: 9 }, () => ({ value: 0, pencilMarks: [] }))
    )
  };
};

export const checkSavedState = (): boolean => {
  console.log(!!loadStateFromLocalStorage());
  return !!loadStateFromLocalStorage();
};
