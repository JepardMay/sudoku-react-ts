import { Dispatch } from 'react';
import { ACTION_TYPE, Action, Grid, TimeHistory, BestTimeHistoryRecord } from '../models';
import { validatePuzzle } from '../utils/validationUtils';
import { removeSavedStorage } from '../utils/storageUtils';

export const setTimeHistory = (
  grid: Grid,
  timeSpent: number,
  isHelperUsed: boolean,
  timeHistory: TimeHistory[],
  bestTimeHistory: BestTimeHistoryRecord | null,
  dispatch: Dispatch<Action>,
) => {
  // Save latest result
  const newScore: TimeHistory = {
    timeSpent: timeSpent,
    difficulty: grid.difficulty ? grid.difficulty : 'easy',
    date: new Date,
    isHelperUsed
  };

  console.log(isHelperUsed);

  const newHistory: TimeHistory[] = [...timeHistory, newScore].slice(-6);
  dispatch({ type: ACTION_TYPE.SET_TIME_HISTORY, payload: newHistory });

  // Skip top times updating if helpers have been used
  if (isHelperUsed) return;

  // Update the best results
  let newBestTimeHistory: BestTimeHistoryRecord;
  
  if (bestTimeHistory) {
    const existingBestTime = bestTimeHistory[newScore.difficulty];
    const isBetterTime = !existingBestTime || newScore.timeSpent < existingBestTime.timeSpent;

    newBestTimeHistory = {
      ...bestTimeHistory,
      [newScore.difficulty]: isBetterTime ? newScore : existingBestTime,
    };
  } else {
    newBestTimeHistory = {
      [newScore.difficulty]: newScore,
    };
  }
  dispatch({ type: ACTION_TYPE.SET_BEST_TIME_HISTORY, payload: newBestTimeHistory });
}

export const handlePuzzleCompletion = (
  grid: Grid,
  timeSpent: number,
  isHelperUsed: boolean,
  timeHistory: TimeHistory[],
  bestTimeHistory: BestTimeHistoryRecord | null,
  dispatch: Dispatch<Action>,
) => {
  if (validatePuzzle(grid)) {
    dispatch({ type: ACTION_TYPE.SET_RESUME, payload: false });
    dispatch({ type: ACTION_TYPE.SET_IS_COMPLETED, payload: true });
    removeSavedStorage('sudokuState');
  
    if (timeSpent > 0) setTimeHistory(grid, timeSpent, isHelperUsed, timeHistory, bestTimeHistory, dispatch);
  }
};
