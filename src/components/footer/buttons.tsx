import React from 'react';
import { FooterBtn, NumberCount } from './styles';

interface NumberButtonProps {
  number: number;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  count: number;
}

export const NumberButton: React.FC<NumberButtonProps> = ({ number, isSelected, isDisabled, onClick, count }) => (
  <FooterBtn
    btnType="number"
    className={isSelected && !isDisabled ? 'selected' : ''}
    onClick={onClick}
    disabled={isDisabled}
  >
    {number}
    <NumberCount>{count}</NumberCount>
  </FooterBtn>
);

interface IconButtonProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ isSelected, onClick, children }) => (
  <FooterBtn
    className={isSelected ? 'selected' : ''}
    onClick={onClick}
  >
    {children}
  </FooterBtn>
);
