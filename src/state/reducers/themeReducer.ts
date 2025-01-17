import { State, Action, ACTION_TYPE } from '../../models';

export const themeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPE.SET_NIGHT_THEME:
      return { ...state, nightTheme: action.payload };
    case ACTION_TYPE.SET_HIGHLIGHTING:
      return { ...state, highlighting: action.payload };
    case ACTION_TYPE.SET_TIMER_HIDDEN:
      return { ...state, timerHidden: action.payload };
    default:
      return state;
  }
};
