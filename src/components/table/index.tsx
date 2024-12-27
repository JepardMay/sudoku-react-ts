import React from 'react';
import { SudokuData } from '../../models';

import { TableContainer, TableRow, TableCell } from './styles';

interface TableProps {
  data: SudokuData;
}

function Table({ data }: Readonly<TableProps>) {
  const renderRow = (value: number[], rowIndex: number) => (
    <TableRow key={`row: ${rowIndex + 1}`}>
      {value.map((value, cellIndex) => renderCell(value, cellIndex, rowIndex))}
    </TableRow>
  );

  const renderCell = (value: number, cellIndex: number, rowIndex: number) => {
    const memoizedValue = value !== 0 ? value : '';

    return (
      <TableCell
        className={value !== 0 ? 'locked' : ''}
        key={`cell: ${cellIndex + 1 + rowIndex * 9}`}
        data-row={rowIndex}
        data-cell={cellIndex}
      >
        <span>{memoizedValue}</span>
      </TableCell>
    );
  };

  return (
     <TableContainer>
      <tbody>
        {data.newboard.grids[0].value.map((value: number[], rowIndex: number) => renderRow(value, rowIndex))}
      </tbody>
    </TableContainer>
  );
}

export default Table;
