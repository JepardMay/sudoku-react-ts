import { State, Action, ACTION_TYPE } from '../../models';

export const timeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPE.SET_TIME_SPENT:
      return { ...state, timeSpent: action.payload };
    case ACTION_TYPE.SET_TIME_HISTORY:
      return { ...state, timeHistory: action.payload };
    case ACTION_TYPE.SET_BEST_TIME_HISTORY:
      return { ...state, bestTimeHistory: action.payload };
    default:
      return state;
  }
};
