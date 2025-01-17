import { State, Action, ACTION_TYPE } from '../../models';

export const gridReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPE.SET_GRID:
      return { ...state, grid: action.payload };
    case ACTION_TYPE.SET_HISTORY:
      return { ...state, history: action.payload };
    case ACTION_TYPE.SET_REDOSTACK:
      return { ...state, redoStack: action.payload };
    default:
      return state;
  }
};
