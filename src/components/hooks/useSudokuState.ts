import { useState, useEffect, useCallback } from 'react';
import { SudokuData, INPUT_TYPE } from '../../models';

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

  const saveStateToLocalStorage = (state: SudokuData) => {
    localStorage.setItem('sudokuState', JSON.stringify(state));
  };

  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state]);

  const setNumber = useCallback((rowIndex: number, cellIndex: number, number: number) => { 
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
    }

    setState(newState);
  }, [pencilMode, setState]);

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
  };
};

export default useSudokuState;
