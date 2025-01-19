import React from 'react';
import { DefinedDifficulty, TimeHistory, BestTimeHistoryRecord } from '../../models';
import { formatTime, formatDate } from '../../utils/formatUtils';
import { Table, Row, Cell } from './styles';

interface BestTimesTableProps {
  bestTimeHistory: BestTimeHistoryRecord | null;
}

const BestTimesTable: React.FC<BestTimesTableProps> = ({ bestTimeHistory }) => {
  const difficultyOrder: DefinedDifficulty[] = ['easy', 'medium', 'hard', 'expert'];
  const sortedBestTimes: BestTimeHistoryRecord = Object.entries(bestTimeHistory ?? {})
    .sort(([a], [b]) => difficultyOrder.indexOf(a as DefinedDifficulty) - difficultyOrder.indexOf(b as DefinedDifficulty))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return (
    <Table>
      <tbody>
        {Object.entries(sortedBestTimes).map(([difficulty, score]: [string, TimeHistory]) => (
          <Row key={score.timeSpent + score.difficulty}>
            <Cell><b>{difficulty}</b></Cell>
            <Cell>{formatDate(score.date)}</Cell>
            <Cell>{formatTime(score.timeSpent)}</Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

export default BestTimesTable;
