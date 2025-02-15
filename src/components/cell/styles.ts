import styled from 'styled-components';

export const TableCell = styled.td`
  position: relative;
  width: var(--cell-width);
  height: var(--cell-width);
  text-align: center;
  vertical-align: middle;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  transition: background-color var(--default-transition),
    color var(--default-transition);

  &:nth-child(3),
  &:nth-child(6) {
    border-right: var(--border-width) solid var(--border-color);
  }

  &.selected {
    color: var(--background-color);
    background-color: var(--active-color);
  }

  &.highlight {
    background-color: var(--highlight-color);
  }

  &.invalid {
    color: var(--mistake-color);
  }

  &.locked {
    pointer-events: none;
  }

  &.conflicting {
    background-color: var(--conflicting-color);
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(.selected):hover {
      background-color: var(--active-color-transparent);
    }
  }
`;

export const NumberSpan = styled.span`
  display: inline-block;
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
