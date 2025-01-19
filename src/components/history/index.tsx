import React from 'react';
import { useInitializeState } from '../../hooks/useInitializeState';
import TimeHistoryTable from './timeHistoryTable';
import BestTimesTable from './bestTimesTable';

import { HistoryWrapper, Title } from './styles';

function History () {
  const { state } = useInitializeState();
  const { timeHistory, bestTimeHistory } = state;
  
  return (
    <HistoryWrapper>
      <Title>Top Times</Title>
      <BestTimesTable bestTimeHistory={bestTimeHistory} />
      <Title>Latest Results</Title>
      <TimeHistoryTable timeHistory={timeHistory} />
    </HistoryWrapper>
  );
};

export default History;
