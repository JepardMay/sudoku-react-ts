import React from 'react';
import { ACTION_TYPE, Cell as CellType } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import Cell from '../cell';

import { TableRow } from './styles';

interface Props {
  row: CellType[];
  rowIndex: number;
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
}
function Row({
  row,
  rowIndex,
  setNumber
}: Readonly<Props>) {
  const { state, dispatch } = useInitializeState();
  const { grid } = state;

  const selectCell = (rowIndex: number, cellIndex: number) => {
    dispatch({ type: ACTION_TYPE.SET_SELECTED_CELL, payload: { row: rowIndex, col: cellIndex } });
  };

  const eraseCell = (rowIndex: number, cellIndex: number) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid.puzzle[rowIndex][cellIndex] = { value: 0, pencilMarks: [] };
    dispatch({ type: ACTION_TYPE.SET_GRID, payload: newGrid });
  };

  return (
    <TableRow key={`row: ${rowIndex + 1}`}>
      {row.map((cell, cellIndex) => (
        <Cell
          key={`cell: ${cellIndex + 1 + rowIndex * 9}`}
          cell={cell}
          cellIndex={cellIndex}
          rowIndex={rowIndex}
          setNumber={setNumber}
          selectCell={selectCell}
          eraseCell={eraseCell}
        />
      ))}
    </TableRow>
  );
}

export default React.memo(Row);
