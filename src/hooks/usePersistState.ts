import { useEffect, useRef } from 'react';
import { ACTION_TYPE, Grid, TimeHistory } from '../models';
import { useInitializeState } from './useInitializeState';
import { validatePuzzle } from '../utils/validationUtils';
import { countNumbersInGrid, isGridEmpty } from '../utils/gridUtils';
import { setStorage, removeSavedStorage } from '../utils/storageUtils';

export const usePersistState = () => {
  const { state, dispatch } = useInitializeState();
  const { grid, timeSpent, inputType, completed, nightTheme, highlighting, timeHistory, bestTimeHistory } = state;
  
  const previousGridRef = useRef<Grid | null>(null);

  useEffect(() => {
    if (previousGridRef.current === grid || isGridEmpty(grid)) {
      return;
    }

    setStorage('sudokuState', JSON.stringify(grid));
    const numberCounts = countNumbersInGrid(grid.puzzle);
    dispatch({ type: ACTION_TYPE.SET_NUMBER_COUNTS, payload: numberCounts });

    if (validatePuzzle(grid) && !completed) {
      dispatch({ type: ACTION_TYPE.SET_RESUME, payload: false });
      dispatch({ type: ACTION_TYPE.SET_IS_COMPLETED, payload: true });
      removeSavedStorage('sudokuState');
      
      const newScore: TimeHistory = {
        timeSpent: timeSpent,
        difficulty: grid.difficulty ? grid.difficulty : 'easy',
        date: new Date
      };

      const newHistory: TimeHistory[] = [...timeHistory, newScore].slice(-6);
      dispatch({ type: ACTION_TYPE.SET_TIME_HISTORY, payload: newHistory });
    }

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
};
