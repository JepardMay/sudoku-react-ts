import { Grid, CellPosition, Cell, NumberCounts } from '../../models';

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

export const validatePuzzle = (grid: Grid): boolean => {
  const { value } = grid;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cellValue = value[row][col].value;

      if (cellValue === 0) {
        return false;
      }

      const conflictingCells = validateCell(
        value.map(row => row.map(cell => cell.value)),
        row,
        col,
        cellValue
      );

      if (conflictingCells.length > 0) {
        return false;
      }
    }
  }

  return true;
};

export const countNumbersInGrid = (grid: Cell[][]): NumberCounts => {
  const count: NumberCounts = {};

  for (const row of grid) {
    for (const cell of row) {
      const value = cell.value;
      if (value !== 0) {
        count[value] = (count[value] || 0) + 1;
      }
    }
  }

  return count;
};

