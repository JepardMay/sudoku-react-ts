import { Grid, Cell } from '../models';

export const updatePencilMarks = (cell: Cell, number: number) => {
  const index = cell.pencilMarks.indexOf(number);
  if (index > -1) {
    cell.pencilMarks.splice(index, 1);
  } else {
    cell.pencilMarks.push(number);
  }
};

export const updateCellValue = (newState: Grid, rowIndex: number, cellIndex: number, number: number) => {
  const cell = newState.puzzle[rowIndex][cellIndex];
  cell.value = number;
  cell.pencilMarks = [];

  updateRowPencilMarks(newState, rowIndex, cellIndex, number);
  updateColumnPencilMarks(newState, rowIndex, cellIndex, number);
  updateBoxPencilMarks(newState, rowIndex, cellIndex, number);
};

const updateRowPencilMarks = (newState: Grid, rowIndex: number, cellIndex: number, number: number) => {
  for (let col = 0; col < 9; col++) {
    if (col !== cellIndex) {
      removePencilMark(newState.puzzle[rowIndex][col], number);
    }
  }
};

const updateColumnPencilMarks = (newState: Grid, rowIndex: number, cellIndex: number, number: number) => {
  for (let row = 0; row < 9; row++) {
    if (row !== rowIndex) {
      removePencilMark(newState.puzzle[row][cellIndex], number);
    }
  }
};

const updateBoxPencilMarks = (newState: Grid, rowIndex: number, cellIndex: number, number: number) => {
  const startRow = Math.floor(rowIndex / 3) * 3;
  const startCol = Math.floor(cellIndex / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (r !== rowIndex || c !== cellIndex) {
        removePencilMark(newState.puzzle[r][c], number);
      }
    }
  }
};

const removePencilMark = (cell: Cell, number: number) => {
  cell.pencilMarks = cell.pencilMarks.filter(mark => mark !== number);
};
