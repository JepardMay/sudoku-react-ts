import styled from 'styled-components';

export const TableContainer = styled.table`
  position: relative;
  font-size: 24px;
  border: var(--border-width) solid var(--border-color);
  border-collapse: collapse;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const TableRow = styled.tr`
  position: relative;

  &:nth-child(3),
  &:nth-child(6) {
    border-bottom: var(--border-width) solid var(--border-color);
  }
`;

export const TableCell = styled.td`
  position: relative;
  width: var(--cell-width);
  height: var(--cell-width);
  text-align: center;
  vertical-align: middle;
  border: 1px solid var(--border-color);
  transition: background-color 200ms ease-in,
    color 100ms ease-in;

  &:nth-child(3),
  &:nth-child(6) {
    border-right: var(--border-width) solid var(--border-color);
  }

  &.selected {
    color: var(--background-color);
    background-color: var(--active-color);
  }

  &.mistake {
    color: var(--mistake-color);
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(.selected):hover {
      background-color: var(--active-color-transparent);
    }
  }
`;
