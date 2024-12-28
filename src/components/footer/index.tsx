import React from 'react';
import { PencilIcon, EraserIcon } from '../Icons';
import { SudokuData, INPUT_TYPE } from '../../models';

import { FooterContainer, FooterBtn } from './styles';

interface FooterProps {
  pencilMode: boolean;
  setPencilMode: React.Dispatch<React.SetStateAction<boolean>>;
  eraserMode: boolean;
  setEraserMode: React.Dispatch<React.SetStateAction<boolean>>;
  inputType: string;
  setInputType: React.Dispatch<React.SetStateAction<string>>;
  selectedNumber: number | null;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>;
  selectedCell: { row: number, col: number } | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<{ row: number, col: number } | null>>;
  setState: React.Dispatch<React.SetStateAction<SudokuData>>;
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
  setState
}: Readonly<FooterProps>) {
  const buttons = [];

  const handleNumberClick = (number: number) => {
    if (inputType === INPUT_TYPE.CELL_FIRST && selectedCell) {
      setState(prevState => {
        const newState = { ...prevState };
        newState.newboard.grids[0].value[selectedCell.row][selectedCell.col] = number;
        return newState;
      });
    } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
      setSelectedNumber(number);
    }
  };

  const handleEraserClick = () => {
    if (inputType === INPUT_TYPE.CELL_FIRST && selectedCell) {
      setState(prevState => {
        const newState = { ...prevState };
        newState.newboard.grids[0].value[selectedCell.row][selectedCell.col] = 0;
        return newState;
      });
    } else {
      setEraserMode(!eraserMode);
    }
  };
  
  for (let i = 1; i <= 9; i++) {
    buttons.push(
      <FooterBtn
        btnType="number"
        className={selectedNumber === i ? 'selected' : ''}
        key={ `button: ${i}` }
        onClick={() => handleNumberClick(i)}
      >
        {i}
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

export default Footer;
