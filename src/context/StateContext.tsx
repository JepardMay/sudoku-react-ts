import React, { createContext, ReactNode, useReducer, useMemo } from 'react';
import { INPUT_TYPE, State, StateContextType, ACTION_TYPE, Action } from '../models';
import { initialSudokuState, checkSavedState } from '../utils/stateInitialization';
import { getStorage } from '../utils/storageUtils';

const initialState: State = {
  grid: initialSudokuState(),
  history: [],
  redoStack: [],
  loading: true,
  inputType: getStorage('inputType', INPUT_TYPE.DIGIT_FIRST),
  selectedNumber: null,
  selectedCell: null,
  pencilMode: false,
  eraserMode: false,
  conflictingCells: [],
  invalidCells: [],
  numberCounts: {},
  completed: false,
  timeSpent: parseInt(getStorage('timeSpent', '0'), 10),
  game: false,
  resume: checkSavedState(),
  error: null,
  difficulty: undefined,
  nightTheme: getStorage<boolean>('nightTheme', false),
  highlighting: getStorage<boolean>('isHighlighting', false),
  timerHidden: getStorage<boolean>('isTimerHidden', false),
};

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPE.SET_GRID:
      return { ...state, grid: action.payload };
    case ACTION_TYPE.SET_HISTORY:
      return { ...state, history: action.payload };
    case ACTION_TYPE.SET_REDOSTACK:
      return { ...state, redoStack: action.payload };
    case ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPE.SET_INPUT_TYPE:
      return { ...state, inputType: action.payload };
    case ACTION_TYPE.SET_SELECTED_NUMBER:
      return { ...state, selectedNumber: action.payload };
    case ACTION_TYPE.SET_SELECTED_CELL:
      return { ...state, selectedCell: action.payload };
    case ACTION_TYPE.SET_PENCIL_MODE:
      return { ...state, pencilMode: action.payload };
    case ACTION_TYPE.SET_ERASER_MODE:
      return { ...state, eraserMode: action.payload };
    case ACTION_TYPE.SET_CONFLICTING_CELLS:
      return { ...state, conflictingCells: action.payload };
    case ACTION_TYPE.SET_INVALID_CELLS:
      return { ...state, invalidCells: action.payload };
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

const StateContext = createContext<StateContextType | undefined>(undefined);

const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};

export { StateContext, StateProvider };
