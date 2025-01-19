import { Dispatch } from 'react';
import { ACTION_TYPE, Action, Grid, Cell, CellPosition, NumberCounts } from '../models';

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
  initialGrid: Grid,
  dispatch: Dispatch<Action>
) => {
  const fillCell = (row: number, col: number, grid: Grid) => {
    if (row >= 9) {
      return;
    }

    const nextCol = (col + 1) % 9;
    const nextRow = col === 8 ? row + 1 : row;

    dispatch({ type: ACTION_TYPE.SET_INVALID_CELLS, payload: [] });
    dispatch({ type: ACTION_TYPE.SET_SELECTED_CELL, payload: null });

    setTimeout(() => {
      const newGrid = JSON.parse(JSON.stringify(grid));
      if (newGrid.puzzle[row][col].value !== newGrid.solution[row][col]) {
        newGrid.puzzle[row][col].value = newGrid.solution[row][col];
      }
      dispatch({ type: ACTION_TYPE.SET_GRID, payload: newGrid });

      fillCell(nextRow, nextCol, newGrid);
    }, 30);
  };

  fillCell(0, 0, initialGrid);
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

export const isGridEmpty = (grid: Grid) => {
    const emptyGrid = {
      difficulty: undefined,
      solution: [[0]],
      puzzle: Array.from({ length: 9 }, () => 
        Array.from({ length: 9 }, () => ({ value: 0, pencilMarks: [] }))
      ),
    };

    return (
      grid.difficulty === emptyGrid.difficulty &&
      JSON.stringify(grid.solution) === JSON.stringify(emptyGrid.solution) &&
      JSON.stringify(grid.puzzle) === JSON.stringify(emptyGrid.puzzle)
    );
  };
