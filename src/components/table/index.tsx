import React, { useCallback } from 'react';
import { SudokuData, CellPosition, Cell, INPUT_TYPE } from '../../models';

import { TableContainer, TableRow, TableCell, PencilMark } from './styles';

interface TableProps {
  data: SudokuData;
  inputType: string;
  eraserMode: boolean; 
  selectedNumber: number | null;
  selectedCell: { row: number, col: number } | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<{ row: number, col: number } | null>>;
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
  setState: React.Dispatch<React.SetStateAction<SudokuData>>;
  conflictingCells: CellPosition[];
}

function Table({
  data,
  inputType,
  eraserMode,
  setNumber,
  selectedNumber,
  selectedCell,
  setSelectedCell,
  setState,
  conflictingCells,
}: Readonly<TableProps>) {
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
  
  const handleCellClick = useCallback((rowIndex: number, cellIndex: number, cell: Cell) => {
    if (cell.locked) return;
    
    if (eraserMode) {
      eraseCell(rowIndex, cellIndex);
    } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
      if (selectedNumber !== null && cell.value === 0) {
        setNumber(rowIndex, cellIndex, selectedNumber);
      }
    } else if (inputType === INPUT_TYPE.CELL_FIRST && cell.value === 0) {
      selectCell(rowIndex, cellIndex);
    }
  }, [eraserMode, inputType, selectedNumber, selectCell, setNumber, eraseCell]);

  const isConflicting = useCallback((row: number, col: number) => {
    return conflictingCells.some(cell => cell.row === row && cell.col === col);
  }, [conflictingCells]);

  const renderCell = useCallback((cell: Cell, cellIndex: number, rowIndex: number) => {
    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === cellIndex;

    return (
      <TableCell
        className={`${cell.locked ? 'locked' : ''} ${isSelected ? 'selected' : ''} ${isConflicting(rowIndex, cellIndex) ? 'conflicting' : ''}`}
        key={`cell: ${cellIndex + 1 + rowIndex * 9}`}
        data-row={rowIndex}
        data-cell={ cellIndex }
        onClick={() => handleCellClick(rowIndex, cellIndex, cell)}
      >
        { cell.value !== 0 ? <span>{ cell.value }</span> : cell.pencilMarks.map(mark =>
          <PencilMark className={ `_${mark}` } key={ `cell: ${cellIndex + 1 + rowIndex * 9}, mark: ${mark}` }>{ mark }</PencilMark>) }
      </TableCell>
    );
  }, [handleCellClick, selectedCell]);
  
  const renderRow = useCallback((row: Cell[], rowIndex: number) => (
    <TableRow key={`row: ${rowIndex + 1}`}>
      {row.map((cell, cellIndex) => renderCell(cell, cellIndex, rowIndex))}
    </TableRow>
  ), [renderCell]);

  return (
     <TableContainer>
      <tbody>
        {data.newboard.grids[0].value.map((row: Cell[], rowIndex: number) => renderRow(row, rowIndex))}
      </tbody>
    </TableContainer>
  );
}

export default React.memo(Table);
