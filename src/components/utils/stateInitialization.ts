import { SudokuData } from '../../models';

export const loadStateFromLocalStorage = (): SudokuData | null => {
  const savedState = localStorage.getItem('sudokuState');
  return savedState ? JSON.parse(savedState) : null;
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
