import { Dispatch } from 'react';
import { ACTION_TYPE, Action, Grid } from '../models';

export const updateHistory = (
  grid: Grid,
  history: Grid[],
  dispatch: Dispatch<Action>,
  updateFunction: (newState: Grid) => void,
) => {
  const newHistory = [...history, JSON.parse(JSON.stringify(grid))];
  dispatch({ type: ACTION_TYPE.SET_HISTORY, payload: newHistory });
  dispatch({ type: ACTION_TYPE.SET_REDOSTACK, payload: [] });
  
  const newGrid = JSON.parse(JSON.stringify(grid));
  updateFunction(newGrid);
  dispatch({ type: ACTION_TYPE.SET_GRID, payload: newGrid });
};
