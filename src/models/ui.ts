import { Cell, Difficulty } from '../models';

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

export type DefinedDifficulty = Exclude<Difficulty, undefined>;

export interface TimeHistory {
  timeSpent: number;
  difficulty: DefinedDifficulty;
  date: Date;
  isHelperUsed: boolean;
}

export interface BestTimeHistory {
  [key: string]: Omit<TimeHistory, 'isHelperUsed'>;
}

export type BestTimeHistoryRecord = Partial<Record<DefinedDifficulty, TimeHistory>>;
