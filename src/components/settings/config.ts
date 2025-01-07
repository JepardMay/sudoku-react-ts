export const getSettingsConfig = (
  validateEntireGrid: () => void,
  setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>,
  handleSolvingSudoku: () => void,
  getHint: () => void,
  reset: () => void,
  isHighlighting: boolean,
  setIsHighlighting: React.Dispatch<React.SetStateAction<boolean>>,
  nightTheme: boolean,
  setNightTheme: React.Dispatch<React.SetStateAction<boolean>>,
) => [
  {
    text: 'Validate',
    onClick: () => {
      validateEntireGrid();
      setSettingsModal(false);
    }
  },
  {
    text: "Hint",
    onClick: () => {
      getHint();
      setSettingsModal(false);
    }
  },
  {
    text: 'Solve',
    onClick: () => {
      handleSolvingSudoku();
      setSettingsModal(false);
    }
  },
  {
    text: 'Reset',
    onClick: () => {
      reset();
      setSettingsModal(false);
    }
  },
  {
    text: 'Highlight crossings',
    onClick: () => { 
      setIsHighlighting(!isHighlighting);
    },
    toggle: true,
    className: `${isHighlighting ? 'active' : ''}`
  },
  {
    text: 'Night Theme',
    onClick: () => { 
      setNightTheme(!nightTheme);
    },
    toggle: true,
    className: `${nightTheme ? 'active' : ''}`
  },
];
