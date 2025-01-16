import { Cell, Difficulty } from '../models';

export interface Grid {
  difficulty: Difficulty;
  solution: number[][];
  puzzle: Cell[][];
}

export interface NumberCounts {
  [key: number]: number;
}

export interface SudokuData {
  puzzle: string;
  solution: string;
  difficulty: Difficulty;
}
