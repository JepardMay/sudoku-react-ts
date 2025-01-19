import styled from "styled-components";

export const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin: 0;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  text-align: left;

  &:first-child{
    margin-top: 0;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
`;

export const Row = styled.tr`
  border-top: 1px solid var(--border-color);

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

  b {
    font-weight: 600;
    color: var(--active-color);
  }
`;

export const Remark = styled.p`
  margin: 0;
  color: var(--active-color-transparent);
  text-align: left;
`;
