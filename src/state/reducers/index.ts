import { State, Action } from '../../models';
import { gridReducer } from './gridReducer';
import { loadingReducer } from './loadingReducer';
import { inputReducer } from './inputReducer';
import { gameStateReducer } from './gameStateReducer';
import { themeReducer } from './themeReducer';

export const stateReducer = (state: State, action: Action): State => {
  const gridState = gridReducer(state, action);
  const loadingState = loadingReducer(gridState, action);
  const inputState = inputReducer(loadingState, action);
  const gameState = gameStateReducer(inputState, action);
  const finalState = themeReducer(gameState, action);
  return finalState;
};
