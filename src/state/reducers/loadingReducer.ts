import { State, Action, ACTION_TYPE } from '../../models';

export const loadingReducer = (state: State, action: Action): State => {
  if (action.type === ACTION_TYPE.SET_LOADING) {
    return { ...state, loading: action.payload };
  }
  return state;
};

