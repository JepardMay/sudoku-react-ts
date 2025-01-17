import { State, Action, ACTION_TYPE } from '../../models';

export const inputReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPE.SET_INPUT_TYPE:
      return { ...state, inputType: action.payload };
    case ACTION_TYPE.SET_SELECTED_NUMBER:
      return { ...state, selectedNumber: action.payload };
    case ACTION_TYPE.SET_SELECTED_CELL:
      return { ...state, selectedCell: action.payload };
    case ACTION_TYPE.SET_PENCIL_MODE:
      return { ...state, pencilMode: action.payload };
    case ACTION_TYPE.SET_CONFLICTING_CELLS:
      return { ...state, conflictingCells: action.payload };
    case ACTION_TYPE.SET_INVALID_CELLS:
      return { ...state, invalidCells: action.payload };
    case ACTION_TYPE.SET_ERASER_MODE:
      return { ...state, eraserMode: action.payload };
    default:
      return state;
  }
};
