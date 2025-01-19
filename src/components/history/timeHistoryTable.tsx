import React from 'react';
import { TimeHistory } from '../../models';
import { formatTime, formatDate } from '../../utils/formatUtils';
import { Table, Row, Cell } from './styles';

interface TimeHistoryTableProps {
  timeHistory: TimeHistory[];
}

const TimeHistoryTable: React.FC<TimeHistoryTableProps> = ({ timeHistory }) => {
  const reversedTimeHistory = [...timeHistory].reverse();

  return (
    <Table>
      <tbody>
        { reversedTimeHistory.map((score: TimeHistory) => (
          <Row key={score.timeSpent + score.difficulty}>
            <Cell><b>{ score.difficulty }</b></Cell>
            <Cell>{ formatDate(score.date) }</Cell>
            <Cell>{ formatTime(score.timeSpent) }</Cell>
          </Row>
        )) }
      </tbody>
    </Table>
  );
};

export default TimeHistoryTable;
