import React from 'react';
import { getSettingsConfig } from './config';

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

function Settings ({
  validateEntireGrid,
  setSettingsModal,
  handleSolvingSudoku,
  isHighlighting,
  setIsHighlighting,
  getHint,
  reset,
}: Readonly<Props>) {
  const settings = getSettingsConfig(
    validateEntireGrid,
    setSettingsModal,
    handleSolvingSudoku,
    getHint,
    reset,
    isHighlighting,
    setIsHighlighting
  );

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
