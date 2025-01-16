import React from 'react';
import { Cell } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import Row from '../row';

import { TableContainer } from './styles';

interface TableProps {
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
}

function Table({
  setNumber,
}: Readonly<TableProps>) {
  const { state } = useInitializeState();
  const { grid } = state;

  return (
    <TableContainer>
      <tbody>
        { grid.puzzle.map((row: Cell[], rowIndex: number) => (
          <Row
            key={ `row: ${rowIndex + 1}` }
            row={ row }
            rowIndex={ rowIndex }
            setNumber={ setNumber }
          />
        )) }
      </tbody>
    </TableContainer>
  )
};

export default Table;
