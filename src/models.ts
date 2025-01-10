export enum INPUT_TYPE {
  DIGIT_FIRST = 'Digit first',
  CELL_FIRST = 'Cell first',
}

export type NumberCounts = {
  [key: number]: number;
}

export type CellPosition = {
  row: number;
  col: number;
}

export type SudokuFetch = {
  state: SudokuData;
  setState: React.Dispatch<React.SetStateAction<SudokuData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setGame: (view: boolean) => void;
  setError: (error: string) => void;
  shouldFetch: boolean;
  isCompleted?: boolean;
  chosenDifficulty: string;
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
  difficulty: string;
  solution: number[][];
  value: Cell[][];
}

export interface SudokuData {
  newboard: {
    grids: Grid[];
    message: string;
    results: number;
  };
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
