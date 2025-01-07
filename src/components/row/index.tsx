// components/RowComponent.tsx
import React, { useCallback} from 'react';
import { SudokuData, Cell as CellType, CellPosition } from '../../models';
import Cell from '../cell';

import { TableRow } from './styles';

interface Props {
  row: CellType[];
  rowIndex: number;
  inputType: string;
  eraserMode: boolean;
  selectedNumber: number | null;
  selectedCell: CellPosition | null;
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
  setSelectedCell: React.Dispatch<React.SetStateAction<CellPosition | null>>;
  setState: React.Dispatch<React.SetStateAction<SudokuData>>;
  conflictingCells: CellPosition[];
  invalidCells: CellPosition[];
  isHighlighting: boolean;
}
function RowComponent (props: Readonly<Props>) {
  const {
    row,
    rowIndex,
    inputType,
    eraserMode,
    selectedNumber,
    selectedCell,
    setNumber,
    setSelectedCell,
    setState,
    conflictingCells,
    invalidCells,
    isHighlighting,
  } = props;

  const selectCell = useCallback((rowIndex: number, cellIndex: number) => {
    setSelectedCell({ row: rowIndex, col: cellIndex });
  }, [setSelectedCell]);

  const eraseCell = useCallback((rowIndex: number, cellIndex: number) => {
    setState(prevState => {
      const newState = { ...prevState };
      newState.newboard.grids[0].value[rowIndex][cellIndex] = { value: 0, pencilMarks: [] };
      return newState;
    });
  }, [setState]);

  return (
    <TableRow key={`row: ${rowIndex + 1}`}>
      {row.map((cell, cellIndex) => (
        <Cell
          key={`cell: ${cellIndex + 1 + rowIndex * 9}`}
          cell={cell}
          cellIndex={cellIndex}
          rowIndex={rowIndex}
          inputType={inputType}
          eraserMode={eraserMode}
          selectedNumber={selectedNumber}
          selectedCell={selectedCell}
          setNumber={setNumber}
          selectCell={selectCell}
          eraseCell={eraseCell}
          conflictingCells={conflictingCells}
          invalidCells={invalidCells}
          isHighlighting={isHighlighting}
        />
      ))}
    </TableRow>
  );
}

export default React.memo(RowComponent);
