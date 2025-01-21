import { ACTION_TYPE, SettingsActions } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';

export const getSettingsConfig = (
  modalActions: SettingsActions,
) => {
  const { state, dispatch } = useInitializeState();
  const { timerHidden, highlighting, nightTheme } = state;

  return [
    {
      text: 'Validate',
      onClick: () => {
        modalActions.validateEntireGrid();
        modalActions.setSettingsModal(false);
        dispatch({ type: ACTION_TYPE.SET_IS_HELPER_USED, payload: true });
      }
    },
    {
      text: "Hint",
      onClick: () => {
        modalActions.getHint();
        modalActions.setSettingsModal(false);
        dispatch({ type: ACTION_TYPE.SET_IS_HELPER_USED, payload: true });
      }
    },
    {
      text: 'Solve',
      onClick: () => {
        modalActions.handleSolvingSudoku();
        modalActions.setSettingsModal(false);
        dispatch({ type: ACTION_TYPE.SET_IS_HELPER_USED, payload: true });
      }
    },
    {
      text: 'Reset',
      onClick: () => {
        modalActions.reset();
        modalActions.setSettingsModal(false);
      }
    },
    {
      text: 'Reset Pencil Marks',
      onClick: () => {
        modalActions.resetPencilMarks();
        modalActions.setSettingsModal(false);
      }
    },
    {
      text: 'Hide timer',
      onClick: () => {
        dispatch({ type: ACTION_TYPE.SET_TIMER_HIDDEN, payload: !timerHidden });
      },
      toggle: true,
      className: `${timerHidden ? 'active' : ''}`
    },
    {
      text: 'Highlight crossings',
      onClick: () => {
        dispatch({ type: ACTION_TYPE.SET_HIGHLIGHTING, payload: !highlighting });
      },
      toggle: true,
      className: `${highlighting ? 'active' : ''}`
    },
    {
      text: 'Night Theme',
      onClick: () => {
        dispatch({ type: ACTION_TYPE.SET_NIGHT_THEME, payload: !nightTheme });
      },
      toggle: true,
      className: `${nightTheme ? 'active' : ''}`
    },
  ]
};
