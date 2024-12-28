import React from 'react';
import { SudokuData, INPUT_TYPE } from '../../models';

import { TableContainer, TableRow, TableCell } from './styles';

interface TableProps {
  data: SudokuData;
  inputType: string;
  eraserMode: boolean; 
  selectedNumber: number | null;
  selectedCell: { row: number, col: number } | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<{ row: number, col: number } | null>>;
  setState: React.Dispatch<React.SetStateAction<SudokuData>>;
}

function Table({ data, inputType, eraserMode, selectedNumber, selectedCell, setSelectedCell, setState }: Readonly<TableProps>) {
  const selectCell = (rowIndex: number, cellIndex: number) => {
    setSelectedCell({ row: rowIndex, col: cellIndex });
  };

  const setNumber = (rowIndex: number, cellIndex: number, number: number) => {
    setState(prevState => {
      const newState = { ...prevState };
      newState.newboard.grids[0].value[rowIndex][cellIndex] = number;
      return newState;
    });
  };

  const eraseCell = (rowIndex: number, cellIndex: number) => {
    setState(prevState => {
      const newState = { ...prevState };
      newState.newboard.grids[0].value[rowIndex][cellIndex] = 0;
      return newState;
    });
  };
  
  const handleCellClick = (rowIndex: number, cellIndex: number, value: number) => {
    if (eraserMode) {
      eraseCell(rowIndex, cellIndex);
    } else if (inputType === INPUT_TYPE.DIGIT_FIRST) {
      if (selectedNumber !== null && value === 0) {
        setNumber(rowIndex, cellIndex, selectedNumber);
      }
    } else if (inputType === INPUT_TYPE.CELL_FIRST && value === 0) {
      selectCell(rowIndex, cellIndex);
    }
  };
  
  const renderRow = (value: number[], rowIndex: number) => (
    <TableRow key={`row: ${rowIndex + 1}`}>
      {value.map((value, cellIndex) => renderCell(value, cellIndex, rowIndex))}
    </TableRow>
  );

  const renderCell = (value: number, cellIndex: number, rowIndex: number) => {
    const memoizedValue = value !== 0 ? value : '';
    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === cellIndex;

    return (
      <TableCell
        className={`${value !== 0 ? 'locked' : ''} ${isSelected ? 'selected' : ''}`}
        key={`cell: ${cellIndex + 1 + rowIndex * 9}`}
        data-row={rowIndex}
        data-cell={ cellIndex }
        onClick={() => handleCellClick(rowIndex, cellIndex, value)}
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
