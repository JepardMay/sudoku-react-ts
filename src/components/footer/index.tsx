import React from 'react';
import { PencilIcon, EraserIcon } from '../Icons';
import { ACTION_TYPE, INPUT_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import { NumberButton, IconButton } from './buttons';
import { handleNumberClick, handleEraserClick } from '../../utils/footerHandlers';
import { FooterContainer, FooterBtn } from './styles';

interface Props {
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
}

function Footer ({
  setNumber,
}: Readonly<Props>) {
  const { state, dispatch } = useInitializeState();
  const { grid, inputType, selectedCell, selectedNumber, numberCounts, eraserMode, pencilMode, mute } = state;

  const numberButtons = Array.from({ length: 9 }, (_, i) => i + 1).map(number => (
    <NumberButton
      key={number}
      number={number}
      isSelected={selectedNumber === number}
      isDisabled={numberCounts[number] === 9}
      onClick={() => handleNumberClick(number, inputType, selectedCell, setNumber, dispatch)}
      count={numberCounts[number]}
    />
  ));

  return (
    <FooterContainer>
      {numberButtons}
      <IconButton isSelected={eraserMode && inputType === INPUT_TYPE.DIGIT_FIRST} onClick={() => handleEraserClick(grid, inputType, selectedCell, mute, dispatch)}>
        <EraserIcon />
      </IconButton>
      <IconButton isSelected={pencilMode} className='pencil' onClick={() => dispatch({ type: ACTION_TYPE.SET_PENCIL_MODE, payload: !pencilMode })}>
        <PencilIcon />
      </IconButton>
      <FooterBtn
        btnType="text"
        onClick={ () => {
          dispatch({ type: ACTION_TYPE.SET_SELECTED_NUMBER, payload: null });
          dispatch({ type: ACTION_TYPE.SET_SELECTED_CELL, payload: null });
          dispatch({ type: ACTION_TYPE.SET_ERASER_MODE, payload: false });
          dispatch({ type: ACTION_TYPE.SET_INPUT_TYPE, payload: inputType === INPUT_TYPE.DIGIT_FIRST ? INPUT_TYPE.CELL_FIRST : INPUT_TYPE.DIGIT_FIRST });
        }}
      >
        {inputType}
      </FooterBtn>
    </FooterContainer>
  );
}

export default React.memo(Footer);
