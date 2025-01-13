import { Grid } from '../models';

export const updateHistory = (
  setState: React.Dispatch<React.SetStateAction<Grid>>,
  setHistory: React.Dispatch<React.SetStateAction<Grid[]>>,
  setRedoStack: React.Dispatch<React.SetStateAction<Grid[]>>,
  currentState: Grid,
  updateFunction: (newState: Grid) => void
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
  history: Grid[], 
  setState: React.Dispatch<React.SetStateAction<Grid>>, 
  setHistory: React.Dispatch<React.SetStateAction<Grid[]>>, 
  setRedoStack: React.Dispatch<React.SetStateAction<Grid[]>>, 
  currentState: Grid
) => {
  if (history.length === 0) return;
  const previousState = history[0];
  setRedoStack(prevRedoStack => [JSON.parse(JSON.stringify(currentState)), ...prevRedoStack]);
  setHistory(prevHistory => prevHistory.slice(1));
  setState(previousState);
};

export const redo = (
  redoStack: Grid[], 
  setState: React.Dispatch<React.SetStateAction<Grid>>, 
  setHistory: React.Dispatch<React.SetStateAction<Grid[]>>, 
  currentState: Grid, 
  setRedoStack: React.Dispatch<React.SetStateAction<Grid[]>>
) => {
  if (redoStack.length === 0) return;
  const nextState = redoStack[0];
  setHistory(prevHistory => [JSON.parse(JSON.stringify(currentState)), ...prevHistory]);
  setRedoStack(prevRedoStack => prevRedoStack.slice(1));
  setState(nextState);
};
