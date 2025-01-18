import { ACTION_TYPE } from '../models';
import { useInitializeState } from './useInitializeState';
import { validateCell, findInvalidCells } from '../utils/validationUtils';
import { solveSudoku, findEmptyCells, getRandomEmptyCell, resetGrid } from '../utils/gridUtils';
import { updatePencilMarks, updateCellValue } from '../utils/updateUtils';
import { updateHistory } from '../utils/historyUtils';
import { cellFillSound } from '../utils/soundUtils';
import { useTimer } from './useTimer';

const useSudokuState = () => {
  const { state, dispatch } = useInitializeState();
  const { grid, history, redoStack, pencilMode } = state;

  useTimer();

  // Helper Functions
  const validateEntireGrid = () => {
    dispatch({ type: ACTION_TYPE.SET_INVALID_CELLS, payload: findInvalidCells(grid) });
  };

  const handleSolvingSudoku = () => {
    solveSudoku(grid, dispatch);
  };

  const setNumber = (rowIndex: number, cellIndex: number, number: number) => {
    dispatch({ type: ACTION_TYPE.SET_INVALID_CELLS, payload: [] });

    const gridValues = grid.puzzle.map(row => row.map(cell => cell.value));
    const conflicts = validateCell(gridValues, rowIndex, cellIndex, number);

    if (!pencilMode && conflicts.length > 0) {
      dispatch({ type: ACTION_TYPE.SET_CONFLICTING_CELLS, payload: conflicts });
      setTimeout(() => dispatch({ type: ACTION_TYPE.SET_CONFLICTING_CELLS, payload: [] }), 3000);
      return;
    }

    if (!pencilMode) cellFillSound();
    
    updateHistory(grid, history, dispatch, (newState) => {
      const cell = newState.puzzle[rowIndex][cellIndex];
      if (pencilMode) {
        updatePencilMarks(cell, number);
      } else {
        updateCellValue(newState, rowIndex, cellIndex, number);
      }
      dispatch({ type: ACTION_TYPE.SET_CONFLICTING_CELLS, payload: [] });
    });
  };

  const undo = () => {
    if (history.length === 0) return;
  
    const previousState = history[0];

    const newHistory = history.slice(1);
    const newRedostack = [JSON.parse(JSON.stringify(grid)), ...redoStack];

    dispatch({ type: ACTION_TYPE.SET_HISTORY, payload: newHistory });
    dispatch({ type: ACTION_TYPE.SET_REDOSTACK, payload: newRedostack });
    dispatch({ type: ACTION_TYPE.SET_GRID, payload: previousState });
};

  const redo = () => {
    if (redoStack.length === 0) return;
  
    const nextState = redoStack[0];

    const newHistory = [JSON.parse(JSON.stringify(grid)), ...history];
    const newRedostack = redoStack.slice(1);

    dispatch({ type: ACTION_TYPE.SET_HISTORY, payload: newHistory });
    dispatch({ type: ACTION_TYPE.SET_REDOSTACK, payload: newRedostack });
    dispatch({ type: ACTION_TYPE.SET_GRID, payload: nextState });
};

  const getHint = () => {
    const emptyCells = findEmptyCells(grid.puzzle);

    if (emptyCells.length === 0) return;

    const { row, col } = getRandomEmptyCell(emptyCells);

    updateHistory(grid, history, dispatch, (newState) => {
      newState.puzzle[row][col].value = grid.solution[row][col];
      updateCellValue(newState, row, col, grid.solution[row][col]);
      dispatch({ type: ACTION_TYPE.SET_INVALID_CELLS, payload: [] });
      dispatch({ type: ACTION_TYPE.SET_CONFLICTING_CELLS, payload: [] });
    });
  };

  const reset = () => updateHistory(grid, history, dispatch, (newState) => {
    newState.puzzle = resetGrid(newState.puzzle);
  });

  return {
    setNumber,
    validateEntireGrid,
    handleSolvingSudoku,
    getHint,
    redo,
    undo,
    reset,
  };
};

export default useSudokuState;
