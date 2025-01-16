import { getSudoku } from 'sudoku-gen';

import { useEffect } from 'react';
import { SudokuData, Grid, Difficulty } from '../models';
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

type SudokuGet = {
  state: Grid;
  setState: React.Dispatch<React.SetStateAction<Grid>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeSpent: React.Dispatch<React.SetStateAction<number>>;
  setGame: (view: boolean) => void;
  setError: (error: string) => void;
  isCompleted?: boolean;
  resume: boolean;
  chosenDifficulty: Difficulty;
}

const useGetSudoku = ({
  setState,
  setLoading,
  setTimeSpent,
  isCompleted,
  resume,
  chosenDifficulty,
  setGame,
  setError
}: SudokuGet) => {
  useEffect(() => {
    if (isCompleted || resume) return;
    
    setLoading(true);
    setTimeSpent(0);
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

