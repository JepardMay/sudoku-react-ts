import { Grid, CellPosition, NumberCounts, Difficulty } from '../models';

export enum ACTION_TYPE {
  SET_GRID = 'SET_GRID',
  SET_HISTORY = 'SET_HISTORY',
  SET_REDOSTACK = 'SET_REDOSTACK',
  SET_LOADING = 'SET_LOADING',
  SET_INPUT_TYPE = 'SET_INPUT_TYPE',
  SET_SELECTED_NUMBER = 'SET_SELECTED_NUMBER',
  SET_SELECTED_CELL = 'SET_SELECTED_CELL',
  SET_PENCIL_MODE = 'SET_PENCIL_MODE',
  SET_ERASER_MODE = 'SET_ERASER_MODE',
  SET_CONFLICTING_CELLS = 'SET_CONFLICTING_CELLS',
  SET_INVALID_CELLS = 'SET_INVALID_CELLS',
  SET_NUMBER_COUNTS = 'SET_NUMBER_COUNTS',
  SET_IS_COMPLETED = 'SET_IS_COMPLETED',
  SET_TIME_SPENT = 'SET_TIME_SPENT',
  SET_GAME = 'SET_GAME',
  SET_RESUME = 'SET_RESUME',
  SET_ERROR = 'SET_ERROR',
  SET_DIFFICULTY = 'SET_DIFFICULTY',
  SET_NIGHT_THEME = 'SET_NIGHT_THEME',
  SET_HIGHLIGHTING = 'SET_HIGHLIGHTING',
  SET_TIMER_HIDDEN = 'SET_TIMER_HIDDEN',
}

export type Action =
  | { type: ACTION_TYPE.SET_GRID; payload: Grid }
  | { type: ACTION_TYPE.SET_HISTORY; payload: Grid[] }
  | { type: ACTION_TYPE.SET_REDOSTACK; payload: Grid[] }
  | { type: ACTION_TYPE.SET_LOADING; payload: boolean }
  | { type: ACTION_TYPE.SET_INPUT_TYPE; payload: string }
  | { type: ACTION_TYPE.SET_SELECTED_NUMBER; payload: number | null }
  | { type: ACTION_TYPE.SET_SELECTED_CELL; payload: CellPosition | null }
  | { type: ACTION_TYPE.SET_PENCIL_MODE; payload: boolean }
  | { type: ACTION_TYPE.SET_ERASER_MODE; payload: boolean }
  | { type: ACTION_TYPE.SET_CONFLICTING_CELLS; payload: CellPosition[] }
  | { type: ACTION_TYPE.SET_INVALID_CELLS; payload: CellPosition[] }
  | { type: ACTION_TYPE.SET_NUMBER_COUNTS; payload: NumberCounts }
  | { type: ACTION_TYPE.SET_IS_COMPLETED; payload: boolean }
  | { type: ACTION_TYPE.SET_TIME_SPENT; payload: number }
  | { type: ACTION_TYPE.SET_GAME; payload: boolean }
  | { type: ACTION_TYPE.SET_RESUME; payload: boolean }
  | { type: ACTION_TYPE.SET_ERROR; payload: string | null }
  | { type: ACTION_TYPE.SET_DIFFICULTY; payload: Difficulty }
  | { type: ACTION_TYPE.SET_NIGHT_THEME; payload: boolean }
  | { type: ACTION_TYPE.SET_HIGHLIGHTING; payload: boolean }
  | { type: ACTION_TYPE.SET_TIMER_HIDDEN; payload: boolean };
