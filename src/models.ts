export enum INPUT_TYPE {
  DIGIT_FIRST = 'Digit first',
  CELL_FIRST = 'Cell first',
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | undefined;

export type NumberCounts = {
  [key: number]: number;
}

export type CellPosition = {
  row: number;
  col: number;
}

export type SudokuGet = {
  state: Grid;
  setState: React.Dispatch<React.SetStateAction<Grid>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setGame: (view: boolean) => void;
  setError: (error: string) => void;
  isCompleted?: boolean;
  chosenDifficulty: Difficulty;
}

export interface ModalActions {
  validateEntireGrid: () => void;
  setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSolvingSudoku: () => void;
  getHint: () => void;
  reset: () => void;
}

export interface ThemeSettings {
  nightTheme: boolean;
  setNightTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HighlightSettings {
  isHighlighting: boolean;
  setIsHighlighting: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TimerSettings {
  isTimerHidden: boolean;
  setIsTimerHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Cell {
  value: number;
  pencilMarks: number[];
  locked?: boolean;
}

export interface Grid {
  difficulty: Difficulty;
  solution: number[][];
  puzzle: Cell[][];
}

export interface SudokuData {
  puzzle: string;
  solution: string;
  difficulty: Difficulty;
}

export interface CellClickData {
  rowIndex: number;
  cellIndex: number;
  cell: Cell;
  inputType: string;
  eraserMode: boolean;
  selectedNumber: number | null;
}

export interface CellCallbacks {
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
  selectCell: (rowIndex: number, cellIndex: number) => void;
  eraseCell: (rowIndex: number, cellIndex: number) => void;
}
