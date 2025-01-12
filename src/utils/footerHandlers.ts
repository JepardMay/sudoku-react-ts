import { SudokuData, CellPosition, INPUT_TYPE } from '../models';
import { cellFillSound, cellEraseSound } from './soundUtils';

export const handleNumberClick = (
  number: number,
  inputType: string,
  selectedCell: CellPosition | null,
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void,
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>,
  setEraserMode: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (inputType === INPUT_TYPE.CELL_FIRST && selectedCell) {
    setNumber(selectedCell.row, selectedCell.col, number);
    cellFillSound();
  } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
    setSelectedNumber(number);
    setEraserMode(false);
  }
};

export const handleEraserClick = (
  inputType: string,
  selectedCell: CellPosition | null,
  setState: React.Dispatch<React.SetStateAction<SudokuData>>,
  setEraserMode: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>
) => {
  if (inputType === INPUT_TYPE.CELL_FIRST && selectedCell) {
    setState(prevState => {
      const newState = { ...prevState };
      newState.newboard.grids[0].value[selectedCell.row][selectedCell.col] = { value: 0, pencilMarks: [] };
      return newState;
    });
    cellEraseSound();
  } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
    setEraserMode(true);
    setSelectedNumber(null);
  }
};
