import React from 'react';

import { SettingsList, SettingsItem, SettingsBtn, Toggle } from './styles';

interface Props {
  validateEntireGrid: () => void;
  setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSolvingSudoku: () => void;
  isHighlighting: boolean;
  setIsHighlighting: React.Dispatch<React.SetStateAction<boolean>>;
  getHint: () => void;
  reset: () => void;
}

const Settings = ({
  validateEntireGrid,
  setSettingsModal,
  handleSolvingSudoku,
  isHighlighting,
  setIsHighlighting,
  getHint,
  reset,
}: Readonly<Props>) => {
  const settings = [
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
    }
  ];

  return (
    <SettingsList>
      { settings.map((el, i) =>
        <SettingsItem key={ `setting-${i + 1}` }>
          <SettingsBtn
            className={ el.className }
            onClick={el.onClick}>
            <span>{ el.text }</span>
            {el.toggle && <Toggle/>}
          </SettingsBtn>
        </SettingsItem>)
      }
    </SettingsList>
  );
};

export default Settings;
