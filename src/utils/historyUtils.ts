import { SudokuData } from '../models';

export const updateHistory = (
  setState: React.Dispatch<React.SetStateAction<SudokuData>>,
  setHistory: React.Dispatch<React.SetStateAction<SudokuData[]>>,
  setRedoStack: React.Dispatch<React.SetStateAction<SudokuData[]>>,
  currentState: SudokuData,
  updateFunction: (newState: SudokuData) => void
) => {
  setHistory(prevHistory => [JSON.parse(JSON.stringify(currentState)), ...prevHistory]);
  setRedoStack([]);
  setState(prevState => {
    const newState = JSON.parse(JSON.stringify(prevState));
    updateFunction(newState);
    return newState;
  });
};

export const undo = (
  history: SudokuData[], 
  setState: React.Dispatch<React.SetStateAction<SudokuData>>, 
  setHistory: React.Dispatch<React.SetStateAction<SudokuData[]>>, 
  setRedoStack: React.Dispatch<React.SetStateAction<SudokuData[]>>, 
  currentState: SudokuData
) => {
  if (history.length === 0) return;
  const previousState = history[0];
  setRedoStack(prevRedoStack => [JSON.parse(JSON.stringify(currentState)), ...prevRedoStack]);
  setHistory(prevHistory => prevHistory.slice(1));
  setState(previousState);
};

export const redo = (
  redoStack: SudokuData[], 
  setState: React.Dispatch<React.SetStateAction<SudokuData>>, 
  setHistory: React.Dispatch<React.SetStateAction<SudokuData[]>>, 
  currentState: SudokuData, 
  setRedoStack: React.Dispatch<React.SetStateAction<SudokuData[]>>
) => {
  if (redoStack.length === 0) return;
  const nextState = redoStack[0];
  setHistory(prevHistory => [JSON.parse(JSON.stringify(currentState)), ...prevHistory]);
  setRedoStack(prevRedoStack => prevRedoStack.slice(1));
  setState(nextState);
};
