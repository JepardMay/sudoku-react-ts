import React from 'react';
import { Grid, CellPosition, Cell } from '../../models';
import Row from '../row';

import { TableContainer } from './styles';

interface TableProps {
  state: Grid;
  inputType: string;
  eraserMode: boolean;
  selectedNumber: number | null;
  selectedCell: { row: number, col: number } | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<{ row: number, col: number } | null>>;
  setNumber: (rowIndex: number, cellIndex: number, number: number) => void;
  setState: React.Dispatch<React.SetStateAction<Grid>>;
  conflictingCells: CellPosition[];
  invalidCells: CellPosition[];
  isHighlighting: boolean;
}

const Table: React.FC<TableProps> = ({
  state,
  inputType,
  eraserMode,
  setNumber,
  selectedNumber,
  selectedCell,
  setSelectedCell,
  setState,
  conflictingCells,
  invalidCells,
  isHighlighting,
}) => (
  <TableContainer>
    <tbody>
      {state.puzzle.map((row: Cell[], rowIndex: number) => (
        <Row
          key={`row: ${rowIndex + 1}`}
          row={row}
          rowIndex={rowIndex}
          inputType={inputType}
          eraserMode={eraserMode}
          selectedNumber={selectedNumber}
          selectedCell={selectedCell}
          setNumber={setNumber}
          setSelectedCell={setSelectedCell}
          setState={setState}
          conflictingCells={conflictingCells}
          invalidCells={invalidCells}
          isHighlighting={isHighlighting}
        />
      ))}
    </tbody>
  </TableContainer>
);

export default React.memo(Table);
