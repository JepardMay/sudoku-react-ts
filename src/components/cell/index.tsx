import React from 'react';
import { Cell as CellType, CellClickData, CellCallbacks } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import { handleCellClick, isConflicting, isInvalid } from '../../utils/tableHandlers';

import { TableCell, NumberSpan, PencilMark } from './styles';

interface Props {
  cell: CellType;
  cellIndex: number;
  rowIndex: number;
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
  selectCell: (rowIndex: number, cellIndex: number) => void;
  eraseCell: (rowIndex: number, cellIndex: number) => void;
}

function Cell ({
  cell,
  cellIndex,
  rowIndex,
  setNumber,
  selectCell,
  eraseCell,
}: Readonly<Props>) {
  const { state } = useInitializeState();
  const { inputType, eraserMode, selectedNumber, selectedCell, conflictingCells, invalidCells, highlighting, mute } = state;

  const clickData: CellClickData = {
    rowIndex,
    cellIndex,
    cell,
    inputType,
    eraserMode,
    selectedNumber,
    mute
  };

  const callbacks: CellCallbacks = {
    setNumber,
    selectCell,
    eraseCell
  };

  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === cellIndex;
  const isHighlighted = (selectedCell?.row === rowIndex || selectedCell?.col === cellIndex) && !isSelected;

  return (
    <TableCell
      className={`${cell.locked ? 'locked' : ''} ${isSelected ? 'selected' : ''} ${isConflicting(rowIndex, cellIndex, conflictingCells) ? 'conflicting' : ''} ${isInvalid(rowIndex, cellIndex, invalidCells) ? 'invalid' : ''} ${isHighlighted && highlighting ? 'highlight' : ''}`}
      key={`cell: ${cellIndex + 1 + rowIndex * 9}`}
      data-row={rowIndex}
      data-cell={cellIndex}
      onClick={() => handleCellClick(clickData, callbacks)}
    >
      {cell.value !== 0 ? <NumberSpan className='pop-in'>{cell.value}</NumberSpan> : cell.pencilMarks.map(mark =>
        <PencilMark className={`_${mark}`} key={`cell: ${cellIndex + 1 + rowIndex * 9}, mark: ${mark}`}>{mark}</PencilMark>
      )}
    </TableCell>
  );
}

export default React.memo(Cell);
