import { useEffect } from 'react';
import { SudokuData, NumberCounts } from '../models';
import { validatePuzzle } from '../utils/validationUtils';
import { countNumbersInGrid } from '../utils/gridUtils';
import { setStorage } from '../utils/storageUtils';

export const usePersistState = (
  state: SudokuData,
  inputType: string,
  timeSpent: number,
  setNumberCounts: React.Dispatch<React.SetStateAction<NumberCounts>>,
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const grid = state.newboard.grids[0];
    setStorage('sudokuState', JSON.stringify(state));
    setNumberCounts(countNumbersInGrid(grid.value));

    if (validatePuzzle(grid)) {
      setIsCompleted(true);
    }
  }, [state]);

  useEffect(() => {
    setStorage('inputType', inputType);
  }, [inputType]);

  useEffect(() => {
    setStorage('timeSpent', String(timeSpent));
  }, [timeSpent]);
};
