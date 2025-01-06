import { SudokuData, Grid, CellPosition, Cell, NumberCounts } from '../../models';

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

export const findInvalidCells = (grid: Grid) => {
  const invalidCells: CellPosition[] = [];

  for (let row = 0; row < grid.solution.length; row++) {
    for (let col = 0; col < grid.solution[row].length; col++) {
      const solutionValue = grid.solution[row][col];
      const cellValue = grid.value[row][col].value;
      
      if (cellValue !== 0 && cellValue !== solutionValue) {
        invalidCells.push({ row, col });
      }
    }
  }

  return invalidCells;
};

export const solveSudoku = (setState: React.Dispatch<React.SetStateAction<SudokuData>>, onComplete: () => void) => {
  let timeoutsRemaining = 0;

  const fillCell = (gridIndex: number, row: number, col: number) => {
    if (row >= 9) {
      if (timeoutsRemaining === 0) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
      return;
    }

    const nextCol = (col + 1) % 9;
    const nextRow = col === 8 ? row + 1 : row;

    timeoutsRemaining++;

    setTimeout(() => {
      setState(prevState => {
        const newState = { ...prevState };
        const grid = newState.newboard.grids[gridIndex];
        if (grid.value[row][col].value === 0) {
          grid.value[row][col].value = grid.solution[row][col];
        }
        return newState;
      });

      timeoutsRemaining--;
      if (timeoutsRemaining === 0 && nextRow >= 9) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }

      fillCell(gridIndex, nextRow, nextCol);
    }, 50);
  };

  fillCell(0, 0, 0);
};

export const findEmptyCells = (gridValues: Cell[][]): CellPosition[] => {
  const emptyCells: CellPosition[] = [];

  for (let row = 0; row < gridValues.length; row++) {
    for (let col = 0; col < gridValues[row].length; col++) {
      if (gridValues[row][col].value === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  return emptyCells;
};

export const getRandomEmptyCell = (emptyCells: CellPosition[]): CellPosition => {
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

export const resetGrid = (grid: Cell[][]): Cell[][] => {
  return grid.map(row => 
    row.map(cell => 
      cell.locked ? cell : { ...cell, value: 0, pencilMarks: [] }
    )
  );
};
