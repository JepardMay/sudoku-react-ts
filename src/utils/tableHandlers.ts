import { INPUT_TYPE, CellPosition, CellClickData, CellCallbacks } from '../models';
import { cellEraseSound } from './soundUtils';

export const handleCellClick = (
  clickData: CellClickData,
  callbacks: CellCallbacks
) => {
  const { rowIndex, cellIndex, cell, inputType, eraserMode, selectedNumber, mute } = clickData;
  const { setNumber, selectCell, eraseCell } = callbacks;

  if (cell.locked) return;

  if (eraserMode) {
    eraseCell(rowIndex, cellIndex);
    cellEraseSound(mute)();
  } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
    if (selectedNumber !== null) {
      setNumber(rowIndex, cellIndex, selectedNumber);
    }
  } else if (inputType === INPUT_TYPE.CELL_FIRST) {
    selectCell(rowIndex, cellIndex);
  }
};

export const isConflicting = (
  row: number,
  col: number,
  conflictingCells: CellPosition[]
) => conflictingCells.some(cell => cell.row === row && cell.col === col);

export const isInvalid = (
  row: number,
  col: number,
  invalidCells: CellPosition[]
) => invalidCells.some(cell => cell.row === row && cell.col === col);
