import { Grid, Cell, CellPosition, NumberCounts } from '../models';

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

export const solveSudoku = (
  setState: React.Dispatch<React.SetStateAction<Grid>>,
  setInvalidCells: React.Dispatch<React.SetStateAction<CellPosition[]>>,
  setSelectedCell: React.Dispatch<React.SetStateAction<CellPosition | null>>
) => {
  const fillCell = (row: number, col: number) => {
    if (row >= 9) {
      return;
    }

    const nextCol = (col + 1) % 9;
    const nextRow = col === 8 ? row + 1 : row;

    setInvalidCells([]);
    setSelectedCell(null);

    setTimeout(() => {
      setState(prevState => {
        const newState = { ...prevState };
        const grid = newState;
        if (grid.puzzle[row][col].value !== grid.solution[row][col]) {
          grid.puzzle[row][col].value = grid.solution[row][col];
        }
        return newState;
      });

      fillCell(nextRow, nextCol);
    }, 30);
  };

  fillCell(0, 0);
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
