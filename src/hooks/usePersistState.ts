import { useEffect } from 'react';
import { Grid, NumberCounts } from '../models';
import { validatePuzzle } from '../utils/validationUtils';
import { countNumbersInGrid } from '../utils/gridUtils';
import { setStorage } from '../utils/storageUtils';

export const usePersistState = (
  state: Grid,
  inputType: string,
  timeSpent: number,
  setNumberCounts: React.Dispatch<React.SetStateAction<NumberCounts>>,
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const grid = state;
    setStorage('sudokuState', JSON.stringify(state));
    setNumberCounts(countNumbersInGrid(grid.puzzle));

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
