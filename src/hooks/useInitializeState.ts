import { useState } from 'react';
import { SudokuData, CellPosition, NumberCounts, INPUT_TYPE } from '../models';
import { initialSudokuState } from '../utils/stateInitialization';
import { getStorage } from '../utils/storageUtils';

export const useInitializeState = () => {
  const [state, setState] = useState<SudokuData>(initialSudokuState);
  const [history, setHistory] = useState<SudokuData[]>([]);
  const [redoStack, setRedoStack] = useState<SudokuData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputType, setInputType] = useState<string>(() => getStorage('inputType', INPUT_TYPE.DIGIT_FIRST));
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [pencilMode, setPencilMode] = useState<boolean>(false);
  const [eraserMode, setEraserMode] = useState<boolean>(false);
  const [conflictingCells, setConflictingCells] = useState<CellPosition[]>([]);
  const [invalidCells, setInvalidCells] = useState<CellPosition[]>([]);
  const [numberCounts, setNumberCounts] = useState<NumberCounts>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(() => parseInt(getStorage('timeSpent', '0'), 10));

  return {
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
  };
};
