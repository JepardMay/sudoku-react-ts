import React from 'react';
import { getSettingsConfig } from './config';
import { ModalActions, ThemeSettings, HighlightSettings, TimerSettings } from '../../models';

import { SettingsList, SettingsItem, SettingsBtn, Toggle } from './styles';

interface Props extends ModalActions, ThemeSettings, HighlightSettings, TimerSettings {};

function Settings ({
  validateEntireGrid,
  setSettingsModal,
  handleSolvingSudoku,
  isHighlighting,
  setIsHighlighting,
  getHint,
  reset,
  nightTheme,
  setNightTheme,
  isTimerHidden,
  setIsTimerHidden
}: Readonly<Props>) {
  const modalActions: ModalActions = {
    validateEntireGrid,
    setSettingsModal,
    handleSolvingSudoku,
    getHint,
    reset,
  };

  const themeSettings: ThemeSettings = {
    nightTheme,
    setNightTheme,
  };

  const highlightSettings: HighlightSettings = {
    isHighlighting,
    setIsHighlighting,
  };

  const timerSettings: TimerSettings = {
    isTimerHidden,
    setIsTimerHidden,
  };

  const settings = getSettingsConfig(modalActions, themeSettings, highlightSettings, timerSettings);

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
