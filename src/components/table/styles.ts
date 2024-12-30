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

  &.locked {
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(.selected):hover {
      background-color: var(--active-color-transparent);
    }
  }
`;

export const PencilMark = styled.span`
  position: absolute;
  font-size: 12px;
  
  &._1 {
    top: 0;
    left: 4px;
  }

  &._2 {
    top: 0;
    left: 20px;
  }

  &._3 {
    top: 0;
    left: 36px;
  }

  &._4 {
    top: 16px;
    left: 4px;
  }

  &._5 {
    top: 16px;
    left: 20px;
  }

  &._6 {
    top: 16px;
    left: 36px;
  }

  &._7 {
    top: 32px;
    left: 4px;
  }

  &._8 {
    top: 32px;
    left: 20px;
  }

  &._9 {
    top: 32px;
    left: 36px;
  }

  @media (max-width: 768px) {
    font-size: 8px;

    &._1 {
      top: 0;
      left: 4px;
    }

    &._2 {
      top: 0;
      left: 15px;
    }

    &._3 {
      top: 0;
      left: 26px;
    }

    &._4 {
      top: 14px;
      left: 4px;
    }

    &._5 {
      top: 14px;
      left: 15px;
    }

    &._6 {
      top: 14px;
      left: 26px;
    }

    &._7 {
      top: 26px;
      left: 4px;
    }

    &._8 {
      top: 26px;
      left: 15px;
    }

    &._9 {
      top: 26px;
      left: 26px;
    }
  }
`;
