import React, { useCallback } from 'react';
import { PencilIcon, EraserIcon } from '../Icons';
import { SudokuData, INPUT_TYPE, NumberCounts, CellPosition } from '../../models';

import { FooterContainer, FooterBtn, NumberCount } from './styles';

interface FooterProps {
  pencilMode: boolean;
  setPencilMode: React.Dispatch<React.SetStateAction<boolean>>;
  eraserMode: boolean;
  setEraserMode: React.Dispatch<React.SetStateAction<boolean>>;
  inputType: string;
  setInputType: React.Dispatch<React.SetStateAction<string>>;
  selectedNumber: number | null;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>;
  selectedCell: CellPosition | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<CellPosition | null>>;
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
  setState: React.Dispatch<React.SetStateAction<SudokuData>>;
  numberCounts: NumberCounts;
}

function Footer({
  pencilMode,
  eraserMode,
  inputType,
  setPencilMode,
  setEraserMode,
  setInputType,
  selectedNumber,
  setSelectedNumber,
  selectedCell,
  setSelectedCell,
  setNumber,
  setState,
  numberCounts,
}: Readonly<FooterProps>) {
  const buttons = [];
  const handleNumberClick = useCallback((number: number) => {
    if (inputType === INPUT_TYPE.CELL_FIRST && selectedCell) {
      setNumber(selectedCell.row, selectedCell.col, number);
    } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
      setSelectedNumber(number);
      setEraserMode(false);
    }
  }, [inputType, selectedCell, setNumber, setSelectedNumber]);

  const handleEraserClick = () => {
    if (inputType === INPUT_TYPE.CELL_FIRST && selectedCell) {
      setState(prevState => {
        const newState = { ...prevState };
        newState.newboard.grids[0].value[selectedCell.row][selectedCell.col] = { value: 0, pencilMarks: [] };
        return newState;
      });
    } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
      setEraserMode(true);
      setSelectedNumber(null);
    }
  };

  for (let i = 1; i <= 9; i++) {
    const isDisabled = numberCounts[i] === 9;
    buttons.push(
      <FooterBtn
        btnType="number"
        className={selectedNumber === i && !isDisabled ? 'selected' : ''}
        key={ `button: ${i}` }
        onClick={ () => handleNumberClick(i) }
        disabled={isDisabled}
      >
        { i }
        <NumberCount>{numberCounts[i]}</NumberCount> 
      </FooterBtn>,
    );
  }

  return (
    <FooterContainer>
      {buttons}
      <FooterBtn
        className={pencilMode ? 'pencil-selected' : ''}
        onClick={() => setPencilMode(!pencilMode)}
      >
        <PencilIcon />
      </FooterBtn>
      <FooterBtn
        className={eraserMode && inputType === INPUT_TYPE.DIGIT_FIRST ? 'selected' : ''}
        onClick={handleEraserClick}
      >
        <EraserIcon />
      </FooterBtn>
      <FooterBtn
        btnType="text"
        onClick={ () => {
          setSelectedNumber(null);
          setSelectedCell(null);
          setInputType(inputType === INPUT_TYPE.DIGIT_FIRST ? INPUT_TYPE.CELL_FIRST : INPUT_TYPE.DIGIT_FIRST);
        }}
      >
        {inputType}
      </FooterBtn>
    </FooterContainer>
  );
}

export default React.memo(Footer);
