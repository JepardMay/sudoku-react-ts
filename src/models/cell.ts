export type CellPosition = {
  row: number;
  col: number;
}

export interface Cell {
  value: number;
  pencilMarks: number[];
  locked?: boolean;
}
