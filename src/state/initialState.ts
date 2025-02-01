import { State } from '../models';
import { loadStateFromLocalStorage, initialGridState, checkSavedGrid } from '../utils/stateInitialization';

export const getInitialState = (): State => {
  return {
    grid: initialGridState(),
    history: [],
    redoStack: [],
    loading: true,
    inputType: loadStateFromLocalStorage().inputType,
    selectedNumber: null,
    selectedCell: null,
    pencilMode: false,
    eraserMode: false,
    conflictingCells: [],
    invalidCells: [],
    numberCounts: {},
    completed: false,
    timeSpent: loadStateFromLocalStorage().timeSpent,
    game: false,
    resume: checkSavedGrid(),
    error: null,
    difficulty: undefined,
    nightTheme: loadStateFromLocalStorage().nightTheme,
    highlighting: loadStateFromLocalStorage().highlighting,
    timerHidden: loadStateFromLocalStorage().timerHidden,
    timeHistory: loadStateFromLocalStorage().timeHistory,
    bestTimeHistory: loadStateFromLocalStorage().bestTimeHistory,
    isHelperUsed: loadStateFromLocalStorage().isHelperUsed,
    mute: false,
  };
};
