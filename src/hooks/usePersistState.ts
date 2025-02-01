import { useEffect, useRef } from 'react';
import { ACTION_TYPE, LocalStorageState, Grid } from '../models';
import { useInitializeState } from './useInitializeState';
import { countNumbersInGrid, isGridEmpty } from '../utils/gridUtils';
import { handlePuzzleCompletion } from '../utils/completionUtils';
import { setStorage } from '../utils/storageUtils';

export const usePersistState = () => {
  const { state, dispatch } = useInitializeState();
  const { grid, timeSpent, inputType, completed, nightTheme, highlighting, timerHidden, timeHistory, bestTimeHistory, isHelperUsed } = state;
  
  const previousGridRef = useRef<Grid | null>(null);

  useEffect(() => {
    if (previousGridRef.current === grid || isGridEmpty(grid)) {
      return;
    }

    const numberCounts = countNumbersInGrid(grid.puzzle);
    dispatch({ type: ACTION_TYPE.SET_NUMBER_COUNTS, payload: numberCounts });

    if (!completed) handlePuzzleCompletion(grid, timeSpent, isHelperUsed, timeHistory, bestTimeHistory, dispatch);

    return () => {
      previousGridRef.current = grid;
    }
  }, [grid]);

  useEffect(() => {
    const localStorageState: LocalStorageState = {
      grid,
      inputType,
      timeSpent,
      nightTheme,
      highlighting,
      timerHidden,
      timeHistory,
      bestTimeHistory,
      isHelperUsed,
    };
    setStorage('sudokuAppState', JSON.stringify(localStorageState));
  }, [grid, inputType, timeSpent, nightTheme, highlighting, timerHidden, timeHistory, bestTimeHistory, isHelperUsed]);

  useEffect(() => {
    document.documentElement.className = nightTheme ? 'night-theme' : '';
  }, [nightTheme]);
};
