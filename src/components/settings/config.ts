import { ModalActions, ThemeSettings, HighlightSettings, TimerSettings } from '../../models';

export const getSettingsConfig = (
  modalActions: ModalActions,
  themeSettings: ThemeSettings,
  highlightSettings: HighlightSettings,
  timerSettings: TimerSettings
) => [
  {
    text: 'Validate',
    onClick: () => {
      modalActions.validateEntireGrid();
      modalActions.setSettingsModal(false);
    }
  },
  {
    text: "Hint",
    onClick: () => {
      modalActions.getHint();
      modalActions.setSettingsModal(false);
    }
  },
  {
    text: 'Solve',
    onClick: () => {
      modalActions.handleSolvingSudoku();
      modalActions.setSettingsModal(false);
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
    text: 'Hide timer',
    onClick: () => { 
      timerSettings.setIsTimerHidden(!timerSettings.isTimerHidden);
    },
    toggle: true,
    className: `${timerSettings.isTimerHidden ? 'active' : ''}`
  },
  {
    text: 'Highlight crossings',
    onClick: () => { 
      highlightSettings.setIsHighlighting(!highlightSettings.isHighlighting);
    },
    toggle: true,
    className: `${highlightSettings.isHighlighting ? 'active' : ''}`
  },
  {
    text: 'Night Theme',
    onClick: () => { 
      themeSettings.setNightTheme(!themeSettings.nightTheme);
    },
    toggle: true,
    className: `${themeSettings.nightTheme ? 'active' : ''}`
  },
];
