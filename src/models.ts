export enum INPUT_TYPE {
  DIGIT_FIRST = 'Digit first',
  CELL_FIRST = 'Cell first',
}

export type NumberCounts = {
  [key: number]: number;
};

export type CellPosition = {
  row: number;
  col: number
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
