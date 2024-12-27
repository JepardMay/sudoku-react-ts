import React from 'react';
import { PencilIcon, EraserIcon } from '../Icons';
import { INPUT_TYPE } from '../../models';

import { FooterContainer, FooterBtn } from './styles';

interface FooterProps {
  pencilMode: boolean;
  setPencilMode: React.Dispatch<React.SetStateAction<boolean>>;
  eraserMode: boolean;
  setEraserMode: React.Dispatch<React.SetStateAction<boolean>>;
  inputType: string;
  setInputType: React.Dispatch<React.SetStateAction<string>>;
}

function Footer({
  pencilMode,
  eraserMode,
  inputType,
  setPencilMode,
  setEraserMode,
  setInputType
}: Readonly<FooterProps>) {
  const buttons = [];
  for (let i = 1; i <= 9; i++) {
    buttons.push(
      <FooterBtn
        btnType="number"
        key={ `button: ${i}` }>
        {i}
      </FooterBtn>,
    );
  }

  return (
    <FooterContainer>
      {buttons}
      <FooterBtn
        className={pencilMode ? 'selected' : ''}
        onClick={() => setPencilMode(!pencilMode)}
      >
        <PencilIcon />
      </FooterBtn>
      <FooterBtn
        className={eraserMode && inputType === INPUT_TYPE.DIGIT_FIRST ? 'selected' : ''}
        onClick={() => setEraserMode(!eraserMode)}
      >
        <EraserIcon />
      </FooterBtn>
      <FooterBtn
        btnType="text"
        onClick={() => setInputType(inputType === INPUT_TYPE.DIGIT_FIRST ? INPUT_TYPE.CELL_FIRST : INPUT_TYPE.DIGIT_FIRST)}
      >
        {inputType}
      </FooterBtn>
    </FooterContainer>
  );
}

export default Footer;
