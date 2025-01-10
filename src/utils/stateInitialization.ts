import { SudokuData } from '../models';
import { getStorage } from './storageUtils';

export const loadStateFromLocalStorage = (): SudokuData | null => {
  return getStorage<SudokuData | null>('sudokuState', null);
};

export const initialSudokuState = (): SudokuData => {
  const savedState = loadStateFromLocalStorage();
  return savedState || {
    newboard: {
      grids: [
        {
          difficulty: '',
          solution: [[0]],
          value: Array.from({ length: 9 }, () => 
            Array.from({ length: 9 }, () => ({ value: 0, pencilMarks: [] }))
          ),
        },
      ],
      message: '',
      results: 0,
    },
  };
};

export const checkSavedState = (): boolean => {
  return !!loadStateFromLocalStorage();
};
