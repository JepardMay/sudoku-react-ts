import React from 'react';
import { Cell as CellType, CellPosition, CellClickData, CellCallbacks } from '../../models';
import { handleCellClick, isConflicting, isInvalid } from '../utils/tableHandlers';

import { TableCell, PencilMark } from './styles';

interface Props {
  cell: CellType;
  cellIndex: number;
  rowIndex: number;
  inputType: string;
  eraserMode: boolean;
  selectedNumber: number | null;
  selectedCell: CellPosition | null;
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
  selectCell: (rowIndex: number, cellIndex: number) => void;
  eraseCell: (rowIndex: number, cellIndex: number) => void;
  conflictingCells: CellPosition[];
  invalidCells: CellPosition[];
  isHighlighting: boolean;
}

function Cell ({
  cell,
  cellIndex,
  rowIndex,
  inputType,
  eraserMode,
  selectedNumber,
  selectedCell,
  setNumber,
  selectCell,
  eraseCell,
  conflictingCells,
  invalidCells,
  isHighlighting,
}: Readonly<Props>) {
  const clickData: CellClickData = {
    rowIndex,
    cellIndex,
    cell,
    inputType,
    eraserMode,
    selectedNumber,
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
      className={`${cell.locked ? 'locked' : ''} ${isSelected ? 'selected' : ''} ${isConflicting(rowIndex, cellIndex, conflictingCells) ? 'conflicting' : ''} ${isInvalid(rowIndex, cellIndex, invalidCells) ? 'invalid' : ''} ${isHighlighted && isHighlighting ? 'highlight' : ''}`}
      key={`cell: ${cellIndex + 1 + rowIndex * 9}`}
      data-row={rowIndex}
      data-cell={cellIndex}
      onClick={() => handleCellClick(clickData, callbacks)}
    >
      {cell.value !== 0 ? <span>{cell.value}</span> : cell.pencilMarks.map(mark =>
        <PencilMark className={`_${mark}`} key={`cell: ${cellIndex + 1 + rowIndex * 9}, mark: ${mark}`}>{mark}</PencilMark>
      )}
    </TableCell>
  );
}

export default React.memo(Cell);
