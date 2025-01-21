import React from 'react';
import { TimeHistory } from '../../models';
import { formatTime, formatDate } from '../../utils/formatUtils';
import { Table, Row, Cell, Remark } from './styles';

interface TimeHistoryTableProps {
  timeHistory: TimeHistory[];
}

const TimeHistoryTable: React.FC<TimeHistoryTableProps> = ({ timeHistory }) => {
  const reversedTimeHistory = [...timeHistory].reverse();
  const isHelperUsedInHistory = timeHistory.some((score) => score.isHelperUsed);

  return (
    <>
      <Table>
        <tbody>
          { reversedTimeHistory.map((score: TimeHistory, i) => (
            <Row key={score.timeSpent + String(score.date) + i + score.difficulty}>
              <Cell><b>{ score.difficulty }{ score.isHelperUsed && '*' }</b></Cell>
              <Cell>{ formatDate(score.date) }</Cell>
              <Cell>{ formatTime(score.timeSpent) }</Cell>
            </Row>
          )) }
        </tbody>
      </Table>
      <Remark>{ isHelperUsedInHistory && '* puzzles solved using helper'}</Remark>
    </>
  );
};

export default TimeHistoryTable;
