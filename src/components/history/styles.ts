import styled from "styled-components";

export const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  font-size: 22px;
  text-align: left;

  & + & {
    margin-top: 20px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
`;

export const Row = styled.tr`
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border: none;
  }

  td:first-child {
    text-align: left;
  }

  td:last-child {
    text-align: right;
  }
`;

export const Cell = styled.td`
  padding: 5px 0;
  vertical-align: middle;
`;
