import { getSudoku } from 'sudoku-gen';

import { useEffect } from 'react';
import { ACTION_TYPE, SudokuData, Grid } from '../models';
import { useInitializeState } from './useInitializeState';
import { stringToArray } from '../utils/formatUtils';

const transformGridData = (data: SudokuData): Grid => ({
  difficulty: data.difficulty,
  solution: stringToArray(data.solution),
  puzzle:  stringToArray(data.puzzle).map(row => row.map(cellValue => ({
    value: cellValue,
    pencilMarks: [],
    locked: cellValue !== 0,
  }))),
});

const useGetSudoku = () => {
  const { state, dispatch } = useInitializeState();
  const { resume, difficulty, completed } = state;

  useEffect(() => {
    if (completed || resume) return;
    
    dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
    dispatch({ type: ACTION_TYPE.SET_TIME_SPENT, payload: 0 });
    
    try {
      const data: SudokuData = getSudoku(difficulty);

      // Transform the data to include pencilMarks
      const transformedData: Grid = transformGridData(data);

      dispatch({ type: ACTION_TYPE.SET_GRID, payload: transformedData });
    } catch(error) {
      console.error('Error getting sudoku:', error);

      dispatch({ type: ACTION_TYPE.SET_ERROR, payload: (error as Error).message });
      dispatch({ type: ACTION_TYPE.SET_GAME, payload: false });
    } finally {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }
  }, [difficulty]);
};

export default useGetSudoku;

