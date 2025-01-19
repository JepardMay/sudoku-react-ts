import { useEffect, useRef } from 'react';
import { ACTION_TYPE, Grid } from '../models';
import { useInitializeState } from './useInitializeState';
import { countNumbersInGrid, isGridEmpty } from '../utils/gridUtils';
import { handlePuzzleCompletion } from '../utils/completionUtils';
import { setStorage } from '../utils/storageUtils';

export const usePersistState = () => {
  const { state, dispatch } = useInitializeState();
  const { grid, timeSpent, inputType, completed, nightTheme, highlighting, timeHistory, bestTimeHistory, isHelperUsed } = state;
  
  const previousGridRef = useRef<Grid | null>(null);

  useEffect(() => {
    if (previousGridRef.current === grid || isGridEmpty(grid)) {
      return;
    }

    setStorage('sudokuState', JSON.stringify(grid));
    const numberCounts = countNumbersInGrid(grid.puzzle);
    dispatch({ type: ACTION_TYPE.SET_NUMBER_COUNTS, payload: numberCounts });

    if (!completed) handlePuzzleCompletion(grid, timeSpent, isHelperUsed, timeHistory, bestTimeHistory, dispatch);

    return () => {
      previousGridRef.current = grid;
    }
  }, [grid]);

  useEffect(() => {
    setStorage('inputType', inputType);
  }, [inputType]);

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

  useEffect(() => {
    setStorage('timeHistory', JSON.stringify(timeHistory));
  }, [timeHistory]);

  useEffect(() => {
    setStorage('bestTimeHistory', JSON.stringify(bestTimeHistory));
  }, [bestTimeHistory]);

  useEffect(() => {
    setStorage('isHelperUsed', String(isHelperUsed));
  }, [isHelperUsed]);
};
