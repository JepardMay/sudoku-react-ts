import React from 'react';
import { TimeHistory } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import { formatTime, formatDate } from '../../utils/formatUtils';

import { HistoryWrapper, Title, Table, Row, Cell } from './styles';

function History () {
  const { state } = useInitializeState();
  const { timeHistory } = state;

  return (
    <HistoryWrapper>
      <Title>Latest Results</Title>
      <Table>
        { timeHistory.map((score: TimeHistory) => (
          <Row key={score.timeSpent + score.difficulty}>
            <Cell>{ score.difficulty }</Cell>
            <Cell>{ formatDate(score.date) }</Cell>
            <Cell>{ formatTime(score.timeSpent) }</Cell>
          </Row>
        )) }
      </Table>
    </HistoryWrapper>
  );
};

export default History;
