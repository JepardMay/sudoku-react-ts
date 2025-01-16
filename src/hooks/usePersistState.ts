import { useEffect, useRef } from 'react';
import { ACTION_TYPE, Grid } from '../models';
import { useInitializeState } from './useInitializeState';
import { validatePuzzle } from '../utils/validationUtils';
import { countNumbersInGrid } from '../utils/gridUtils';
import { setStorage } from '../utils/storageUtils';

export const usePersistState = () => {
  const { state, dispatch } = useInitializeState();
  const { grid, timeSpent, inputType, nightTheme, highlighting } = state;
  
  const previousGridRef = useRef<Grid | null>(null);

  useEffect(() => {
    if (previousGridRef.current === grid) {
      return;
    }
    previousGridRef.current = grid;

    setStorage('sudokuState', JSON.stringify(grid));
    const numberCounts = countNumbersInGrid(grid.puzzle);
    dispatch({ type: ACTION_TYPE.SET_NUMBER_COUNTS, payload: numberCounts });

    if (validatePuzzle(grid)) {
      dispatch({ type: ACTION_TYPE.SET_IS_COMPLETED, payload: true });
    }
  }, [grid]);

  useEffect(() => {
    setStorage('inputType', inputType);
  }, [inputType]);

  useEffect(() => {
    setStorage('timeSpent', String(timeSpent));
  }, [timeSpent]);

  useEffect(() => {
    setStorage('timeSpent', String(timeSpent));
  }, [timeSpent]);

  useEffect(() => {
    document.documentElement.className = nightTheme ? 'night-theme' : '';
    setStorage('nightTheme', String(nightTheme));
  }, [nightTheme]);

  useEffect(() => {
    setStorage('highlighting', String(highlighting));
  }, [highlighting]);
};
