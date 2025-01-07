import React, { useCallback } from 'react';
import { PencilIcon, EraserIcon } from '../Icons';
import { SudokuData, INPUT_TYPE, NumberCounts, CellPosition } from '../../models';
import { NumberButton, IconButton } from './buttons';
import { handleNumberClick, handleEraserClick } from '../utils/footerHandlers';
import { FooterContainer, FooterBtn } from './styles';

interface Props {
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

function Footer ({
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
  numberCounts
}: Readonly<Props>) {
  const handleNumberClickMemoized = useCallback((number: number) => {
    handleNumberClick(number, inputType, selectedCell, setNumber, setSelectedNumber, setEraserMode);
  }, [inputType, selectedCell, setNumber, setSelectedNumber, setEraserMode]);

  const numberButtons = Array.from({ length: 9 }, (_, i) => i + 1).map(number => (
    <NumberButton
      key={number}
      number={number}
      isSelected={selectedNumber === number}
      isDisabled={numberCounts[number] === 9}
      onClick={() => handleNumberClickMemoized(number)}
      count={numberCounts[number]}
    />
  ));

  return (
    <FooterContainer>
      {numberButtons}
      <IconButton isSelected={pencilMode} onClick={() => setPencilMode(!pencilMode)}>
        <PencilIcon />
      </IconButton>
      <IconButton isSelected={eraserMode && inputType === INPUT_TYPE.DIGIT_FIRST} onClick={() => handleEraserClick(inputType, selectedCell, setState, setEraserMode, setSelectedNumber)}>
        <EraserIcon />
      </IconButton>
      <FooterBtn
        btnType="text"
        onClick={() => {
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
