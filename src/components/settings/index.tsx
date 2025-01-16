import React from 'react';
import { getSettingsConfig } from './config';
import { SettingsActions } from '../../models';

import { SettingsList, SettingsItem, SettingsBtn, Toggle } from './styles';

interface Props extends SettingsActions {}

function Settings ({
  validateEntireGrid,
  setSettingsModal,
  handleSolvingSudoku,
  getHint,
  reset,
}: Readonly<Props>) {
  const modalActions: SettingsActions = {
    validateEntireGrid,
    setSettingsModal,
    handleSolvingSudoku,
    getHint,
    reset,
  };

  const settings = getSettingsConfig(modalActions);

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
