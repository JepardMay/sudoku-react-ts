import { Dispatch } from 'react';
import { ACTION_TYPE, Action, Grid, CellPosition, INPUT_TYPE } from '../models';
import { cellEraseSound } from './soundUtils';

export const handleNumberClick = (
  number: number,
  inputType: string,
  selectedCell: CellPosition | null,
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void,
  dispatch: Dispatch<Action>,
) => {
  if (inputType === INPUT_TYPE.CELL_FIRST && selectedCell) {
    setNumber(selectedCell.row, selectedCell.col, number);
  } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
    dispatch({ type: ACTION_TYPE.SET_SELECTED_NUMBER, payload: number });
    dispatch({ type: ACTION_TYPE.SET_ERASER_MODE, payload: false });
  }
};

export const handleEraserClick = (
  grid: Grid,
  inputType: string,
  selectedCell: CellPosition | null,
  mute: boolean,
  dispatch: Dispatch<Action>,
) => {
  if (inputType === INPUT_TYPE.CELL_FIRST && selectedCell) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid.puzzle[selectedCell.row][selectedCell.col] = { value: 0, pencilMarks: [] };
    dispatch({ type: ACTION_TYPE.SET_GRID, payload: newGrid });
    cellEraseSound(mute)();
  } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
    dispatch({ type: ACTION_TYPE.SET_SELECTED_NUMBER, payload: null });
    dispatch({ type: ACTION_TYPE.SET_ERASER_MODE, payload: true });
  }
};
