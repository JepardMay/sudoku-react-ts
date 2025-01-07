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
