import { useState, useEffect, useCallback } from 'react';
import { SudokuData, CellPosition, NumberCounts, INPUT_TYPE } from '../../models';
import { validateCell, validatePuzzle, findInvalidCells } from '../utils/validationUtils';
import { countNumbersInGrid, solveSudoku, findEmptyCells, getRandomEmptyCell, resetGrid } from '../utils/gridUtils';
import { initialSudokuState } from '../utils/stateInitialization';
import { updatePencilMarks, updateCellValue } from '../utils/updateUtils';
import { updateHistory, undo as undoHistory, redo as redoHistory } from '../utils/historyUtils';

const useSudokuState = () => {
  const [state, setState] = useState<SudokuData>(initialSudokuState);
  const [history, setHistory] = useState<SudokuData[]>([]);
  const [redoStack, setRedoStack] = useState<SudokuData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputType, setInputType] = useState<string>(() => {
    const savedInputType = localStorage.getItem('inputType');
    return savedInputType ?? INPUT_TYPE.DIGIT_FIRST;
  });
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [pencilMode, setPencilMode] = useState<boolean>(false);
  const [eraserMode, setEraserMode] = useState<boolean>(false);
  const [conflictingCells, setConflictingCells] = useState<CellPosition[]>([]);
  const [invalidCells, setInvalidCells] = useState<CellPosition[]>([]);
  const [numberCounts, setNumberCounts] = useState<NumberCounts>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

   const [timeSpent, setTimeSpent] = useState<number>(() => {
    const savedTime = localStorage.getItem('timeSpent');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const saveStateToLocalStorage = (state: SudokuData) => {
    localStorage.setItem('sudokuState', JSON.stringify(state));
  };

  useEffect(() => {
    saveStateToLocalStorage(state);
    setNumberCounts(countNumbersInGrid(state.newboard.grids[0].value));
  }, [state]);

  useEffect(() => {
    const grid = state.newboard.grids[0];
    if (validatePuzzle(grid)) {
      setIsCompleted(true);
    }
  }, [state]);

  useEffect(() => {
    localStorage.setItem('inputType', inputType);
  }, [inputType]);
  
  useEffect(() => {
    localStorage.setItem('timeSpent', timeSpent.toString());
  }, [timeSpent]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearInterval(timer);
      } else if (!isCompleted) {
        timer = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
      }
    };

    if (!isCompleted) {
      timer = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isCompleted]);

  const validateEntireGrid = useCallback(() => {
    const grid = state.newboard.grids[0];
    const invalidCells = findInvalidCells(grid);
    setInvalidCells(invalidCells);
  }, [state]);

  const handleSolvingSudoku = useCallback(() => {
    solveSudoku(setState, setInvalidCells, setSelectedCell);
  }, [state]);

  const setNumber = useCallback((rowIndex: number, cellIndex: number, number: number) => {
    setInvalidCells([]);

    const gridValues = state.newboard.grids[0].value.map(row => row.map(cell => cell.value));
    const conflicts = validateCell(gridValues, rowIndex, cellIndex, number);

    if (!pencilMode && conflicts.length > 0) {
      setConflictingCells(conflicts);
      setTimeout(() => setConflictingCells([]), 3000);
      return;
    }

    updateHistory(setState, setHistory, setRedoStack, state, newState => {
      const cell = newState.newboard.grids[0].value[rowIndex][cellIndex];

      if (pencilMode) {
        updatePencilMarks(cell, number);
      } else {
        updateCellValue(newState, rowIndex, cellIndex, number);
      }

      setConflictingCells([]);
    });
  }, [pencilMode, state, conflictingCells]);

  const undo = useCallback(() => {
    undoHistory(history, setState, setHistory, setRedoStack, state);
  }, [history, state]);

  const redo = useCallback(() => {
    redoHistory(redoStack, setState, setHistory, state, setRedoStack);
  }, [redoStack, state]);

  const getHint = useCallback(() => {
    const grid = state.newboard.grids[0];
    const emptyCells = findEmptyCells(grid.value);

    if (emptyCells.length === 0) return;

    const { row, col } = getRandomEmptyCell(emptyCells);

    updateHistory(setState, setHistory, setRedoStack, state, newState => {
      newState.newboard.grids[0].value[row][col].value = grid.solution[row][col];
    });
  }, [state]);

  const reset = useCallback(() => {
    updateHistory(setState, setHistory, setRedoStack, state, newState => {
      newState.newboard.grids[0].value = resetGrid(newState.newboard.grids[0].value);
    });
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
    reset,
    history, 
    redoStack,
    undo,
    redo,
    timeSpent,
  };
};

export default useSudokuState;
