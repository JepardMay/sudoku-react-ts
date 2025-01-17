import { State, Action, ACTION_TYPE } from '../../models';

export const gameStateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPE.SET_NUMBER_COUNTS:
      return { ...state, numberCounts: action.payload };
    case ACTION_TYPE.SET_IS_COMPLETED:
      return { ...state, completed: action.payload };
    case ACTION_TYPE.SET_TIME_SPENT:
      return { ...state, timeSpent: action.payload };
    case ACTION_TYPE.SET_GAME:
      return { ...state, game: action.payload };
    case ACTION_TYPE.SET_RESUME:
      return { ...state, resume: action.payload };
    case ACTION_TYPE.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTION_TYPE.SET_DIFFICULTY:
      return { ...state, difficulty: action.payload };
    default:
      return state;
  }
};
