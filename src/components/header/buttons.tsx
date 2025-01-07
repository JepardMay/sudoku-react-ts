import React from 'react';
import { ArrowAlt, EllipsisIcon } from '../Icons';
import { UndoBtn, RedoBtn, SettingsBtn } from './styles';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const UndoButton: React.FC<ButtonProps> = ({ onClick, disabled }) => (
  <UndoBtn onClick={onClick} disabled={disabled}>
    <ArrowAlt />
  </UndoBtn>
);

export const RedoButton: React.FC<ButtonProps> = ({ onClick, disabled }) => (
  <RedoBtn onClick={onClick} disabled={disabled}>
    <ArrowAlt />
  </RedoBtn>
);

export const SettingsButton: React.FC<Omit<ButtonProps, 'disabled'>> = ({ onClick }) => (
  <SettingsBtn onClick={onClick}>
    <EllipsisIcon />
  </SettingsBtn>
);

