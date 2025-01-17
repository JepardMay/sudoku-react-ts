import { INPUT_TYPE, State } from '../models';
import { initialSudokuState, checkSavedState } from '../utils/stateInitialization';
import { getStorage } from '../utils/storageUtils';

export const getInitialState = (): State => ({
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
});
