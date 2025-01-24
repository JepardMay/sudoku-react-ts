import { ACTION_TYPE, Grid } from '../models';
import { updateHistory } from './historyUtils';

const mockDispatch = jest.fn();

describe('updateHistory', () => {
  let initialGrid: Grid;
  let history: Grid[];

  beforeEach(() => {
    jest.clearAllMocks();

    initialGrid = {
      puzzle: [
        [{ value: 0, pencilMarks: [] }, { value: 0, pencilMarks: [] }, { value: 0, pencilMarks: [] }],
        [{ value: 0, pencilMarks: [] }, { value: 0, pencilMarks: [] }, { value: 0, pencilMarks: [] }],
        [{ value: 0, pencilMarks: [] }, { value: 0, pencilMarks: [] }, { value: 0, pencilMarks: [] }],
      ],
      solution: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      difficulty: undefined
    };
    history = [];
  });

  it('should update history and grid correctly', () => {
    const newGridState: Grid = JSON.parse(JSON.stringify(initialGrid));
    newGridState.puzzle[0][0].value = 1;

    const updateFunction = (newState: Grid) => {
      newState.puzzle[0][0].value = 1;
    };

    updateHistory(initialGrid, history, mockDispatch, updateFunction);

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE.SET_HISTORY,
      payload: [initialGrid],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE.SET_REDOSTACK,
      payload: [],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE.SET_GRID,
      payload: newGridState,
    });

    expect(newGridState.puzzle[0][0].value).toBe(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE.SET_HISTORY,
      payload: expect.arrayContaining([initialGrid]),
    });
  });

  it('should not mutate the original grid', () => {
    const initialGridCopy = JSON.parse(JSON.stringify(initialGrid));
    
    const updateFunction = (newState: Grid) => {
      newState.puzzle[0][0].value = 1;
    };

    updateHistory(initialGrid, history, mockDispatch, updateFunction);

    expect(initialGrid).toEqual(initialGridCopy);
  });
});
