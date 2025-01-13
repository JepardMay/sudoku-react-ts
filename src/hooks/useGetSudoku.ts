import { getSudoku } from 'sudoku-gen';

import { useEffect } from 'react';
import { SudokuData, Grid, SudokuGet } from '../models';
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

const useGetSudoku = ({
  setState,
  setLoading,
  isCompleted,
  chosenDifficulty,
  setGame,
  setError
}: SudokuGet) => {
  useEffect(() => {
    if (isCompleted) return;
    
    setLoading(true);
    try {
      const data: SudokuData = getSudoku(chosenDifficulty);

      // Transform the data to include pencilMarks
      const transformedData: Grid = transformGridData(data);

      setState(transformedData);
    } catch(error) {
      console.error('Error getting sudoku:', error);
      setError((error as Error).message);
      setGame(false);
    } finally {
      setLoading(false);
    }
  }, [chosenDifficulty]);
};

export default useGetSudoku;

