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
  chosenDifficulty: string;
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
