import styled from 'styled-components';

export const TableRow = styled.tr`
  position: relative;

  &:nth-child(3),
  &:nth-child(6) {
    border-bottom: var(--border-width) solid var(--border-color);
  }
`;
