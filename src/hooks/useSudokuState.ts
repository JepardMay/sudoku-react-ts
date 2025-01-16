import { useCallback } from 'react';
import { validateCell, findInvalidCells } from '../utils/validationUtils';
import { solveSudoku, findEmptyCells, getRandomEmptyCell, resetGrid } from '../utils/gridUtils';
import { updatePencilMarks, updateCellValue } from '../utils/updateUtils';
import { updateHistory, undo as undoHistory, redo as redoHistory } from '../utils/historyUtils';
import { useTimer } from './useTimer';
import { useInitializeState } from './useInitializeState';
import { usePersistState } from './usePersistState';

const useSudokuState = () => {
  const {
    state,
    setState,
    history,
    setHistory,
    redoStack,
    setRedoStack,
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
    conflictingCells,
    setConflictingCells,
    invalidCells,
    setInvalidCells,
    numberCounts,
    setNumberCounts,
    isCompleted,
    setIsCompleted,
    timeSpent,
    setTimeSpent,
  } = useInitializeState();

  usePersistState(state, inputType, timeSpent, setNumberCounts, setIsCompleted);
  useTimer(isCompleted, setTimeSpent);

  // Helper Functions
  const validateEntireGrid = useCallback(() => {
    setInvalidCells(findInvalidCells(state));
  }, [state]);

  const handleSolvingSudoku = useCallback(() => {
    solveSudoku(setState, setInvalidCells, setSelectedCell);
  }, [state]);

  const setNumber = useCallback((rowIndex: number, cellIndex: number, number: number) => {
    setInvalidCells([]);

    const gridValues = state.puzzle.map(row => row.map(cell => cell.value));
    const conflicts = validateCell(gridValues, rowIndex, cellIndex, number);

    if (!pencilMode && conflicts.length > 0) {
      setConflictingCells(conflicts);
      setTimeout(() => setConflictingCells([]), 3000);
      return;
    }

    updateHistory(setState, setHistory, setRedoStack, state, newState => {
      const cell = newState.puzzle[rowIndex][cellIndex];
      pencilMode ? updatePencilMarks(cell, number) : updateCellValue(newState, rowIndex, cellIndex, number);
      setConflictingCells([]);
    });
  }, [pencilMode, state]);

  const undo = useCallback(() => undoHistory(history, setState, setHistory, setRedoStack, state), [history, state]);
  const redo = useCallback(() => redoHistory(redoStack, setState, setHistory, state, setRedoStack), [redoStack, state]);

  const getHint = useCallback(() => {
    const grid = state;
    const emptyCells = findEmptyCells(grid.puzzle);

    if (emptyCells.length === 0) return;

    const { row, col } = getRandomEmptyCell(emptyCells);

    updateHistory(setState, setHistory, setRedoStack, state, newState => {
      newState.puzzle[row][col].value = grid.solution[row][col];
      updateCellValue(newState, row, col, grid.solution[row][col]);
      setInvalidCells([]);
      setConflictingCells([]);
    });
  }, [state]);

  const reset = useCallback(() => updateHistory(setState, setHistory, setRedoStack, state, newState => {
    newState.puzzle = resetGrid(newState.puzzle);
  }), [state]);

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
    setTimeSpent,
  };
};

export default useSudokuState;
