import { CellPosition } from '../../models';

export const validateCell = (grid: number[][], row: number, col: number, value: number): CellPosition[] => {
  const conflictingCells: CellPosition[] = [];

  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === value) conflictingCells.push({ row, col: i });
    if (grid[i][col] === value) conflictingCells.push({ row: i, col });
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (grid[i][j] === value) conflictingCells.push({ row: i, col: j });
    }
  }

  return conflictingCells.filter(cell => cell.row !== row || cell.col !== col);
};
