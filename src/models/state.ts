import { Dispatch } from 'react';
import { Action, Grid, CellPosition, NumberCounts, Difficulty } from '../models';

export interface State {
  grid: Grid;
  history: Grid[];
  redoStack: Grid[];
  loading: boolean;
  inputType: string;
  selectedNumber: number | null;
  selectedCell: CellPosition | null;
  pencilMode: boolean;
  eraserMode: boolean;
  conflictingCells: CellPosition[];
  invalidCells: CellPosition[];
  numberCounts: NumberCounts;
  completed: boolean;
  timeSpent: number;
  game: boolean;
  resume: boolean;
  error: string | null,
  difficulty: Difficulty,
  nightTheme: boolean,
  highlighting: boolean,
  timerHidden: boolean,
}

export interface StateContextType {
  state: State;
  dispatch: Dispatch<Action>;
}
