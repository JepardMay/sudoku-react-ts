import { Cell } from './cell';

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
