import { Cell } from './cell';

export interface ModalActions {
  validateEntireGrid: () => void;
  setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSolvingSudoku: () => void;
  getHint: () => void;
  reset: () => void;
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
