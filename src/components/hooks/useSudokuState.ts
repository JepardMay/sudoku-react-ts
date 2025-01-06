import { useState, useEffect, useCallback } from 'react';
import { SudokuData, CellPosition, NumberCounts, INPUT_TYPE } from '../../models';
import { validateCell, validatePuzzle, countNumbersInGrid, findInvalidCells, solveSudoku, findEmptyCells, getRandomEmptyCell } from '../utils/validationUtils';

const useSudokuState = () => {
  const loadStateFromLocalStorage = (): SudokuData | null => {
    const savedState = localStorage.getItem('sudokuState');
    return savedState ? JSON.parse(savedState) : null;
  };

  const [state, setState] = useState<SudokuData>(() => {
    const savedState = loadStateFromLocalStorage();
    return savedState || {
      newboard: {
        grids: [
          {
            difficulty: '',
            solution: [[0]],
            value: Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ({ value: 0, pencilMarks: [] }))),
          },
        ],
        message: '',
        results: 0,
      },
    };
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [inputType, setInputType] = useState<string>(INPUT_TYPE.DIGIT_FIRST);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);
  const [pencilMode, setPencilMode] = useState<boolean>(false);
  const [eraserMode, setEraserMode] = useState<boolean>(false);
  const [conflictingCells, setConflictingCells] = useState<CellPosition[]>([]);
  const [invalidCells, setInvalidCells] = useState<CellPosition[]>([]);
  const [numberCounts, setNumberCounts] = useState<NumberCounts>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const saveStateToLocalStorage = (state: SudokuData) => {
    localStorage.setItem('sudokuState', JSON.stringify(state));
  };

  useEffect(() => {
    saveStateToLocalStorage(state);
    setNumberCounts(countNumbersInGrid(state.newboard.grids[0].value));
  }, [state]);

  const checkCompletion = useCallback(() => {
    const grid = state.newboard.grids[0];
    if (validatePuzzle(grid)) {
      setIsCompleted(true);
    }
  }, [state]);

  const validateEntireGrid = useCallback(() => {
    const grid = state.newboard.grids[0];
    const invalidCells = findInvalidCells(grid);
    setInvalidCells(invalidCells);
  }, [state]);

  const handleSolvingSudoku = useCallback(() => {
    solveSudoku(setState, () => setIsCompleted(true));
  }, [state]);

  const setNumber = useCallback((rowIndex: number, cellIndex: number, number: number) => {
    const gridValues = state.newboard.grids[0].value.map(row => row.map(cell => cell.value));
    const conflicts = validateCell(gridValues, rowIndex, cellIndex, number);

    if (!pencilMode && conflicts.length > 0) {
      setConflictingCells(conflicts);

      setTimeout(() => {
        setConflictingCells([]);
      }, 3000);
      return;
    }

    const newState = { ...state };
    const cell = newState.newboard.grids[0].value[rowIndex][cellIndex];

    if (pencilMode) {
      const pencilMarks = cell.pencilMarks;
      if (pencilMarks.includes(number)) {
        cell.pencilMarks = pencilMarks.filter(mark => mark !== number);
      } else {
        cell.pencilMarks.push(number);
      }
    } else {
      cell.value = number;
      cell.pencilMarks = [];

      for (let col = 0; col < 9; col++) {
        if (col !== cellIndex) {
          newState.newboard.grids[0].value[rowIndex][col].pencilMarks = 
            newState.newboard.grids[0].value[rowIndex][col].pencilMarks.filter(mark => mark !== number);
        }
      }

      for (let row = 0; row < 9; row++) {
        if (row !== rowIndex) {
          newState.newboard.grids[0].value[row][cellIndex].pencilMarks = 
            newState.newboard.grids[0].value[row][cellIndex].pencilMarks.filter(mark => mark !== number);
        }
      }

      const startRow = Math.floor(rowIndex / 3) * 3;
      const startCol = Math.floor(cellIndex / 3) * 3;
      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          if (r !== rowIndex || c !== cellIndex) {
            newState.newboard.grids[0].value[r][c].pencilMarks = 
              newState.newboard.grids[0].value[r][c].pencilMarks.filter(mark => mark !== number);
          }
        }
      }
    }

    setConflictingCells([]);
    setState(newState);
    checkCompletion();
  }, [pencilMode, state, conflictingCells]);

  const getHint = useCallback(() => {
    const grid = state.newboard.grids[0];
    const emptyCells = findEmptyCells(grid.value);

    if (emptyCells.length === 0) return;

    const { row, col } = getRandomEmptyCell(emptyCells);

    const newState = { ...state };
    newState.newboard.grids[0].value[row][col].value = grid.solution[row][col];
    setState(newState);
  }, [state]);

  return {
    state,
    setState,
    loading,
    setLoading,
    inputType,
    setInputType,
    selectedNumber,
    setSelectedNumber,
    selectedCell,
    setSelectedCell,
    pencilMode,
    setPencilMode,
    eraserMode,
    setEraserMode,
    setNumber,
    conflictingCells,
    isCompleted,
    numberCounts,
    invalidCells,
    validateEntireGrid,
    handleSolvingSudoku,
    getHint,
  };
};

export default useSudokuState;
