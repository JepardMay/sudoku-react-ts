import React from 'react';

import { SettingsList, SettingsItem, SettingsBtn } from './styles';

const Settings = () => {
  const settings = [
    {
      text: 'Validate Puzzle',
      onClick: () => {}
    },
    {
      text: 'Solve Puzzle',
      onClick: () => {}
    },
  ];

  return (
    <SettingsList>
      { settings.map((el, i) =>
        <SettingsItem key={ `setting-${i + 1}` }>
          <SettingsBtn onClick={el.onClick}>{el.text}</SettingsBtn>
        </SettingsItem>)
      }
    </SettingsList>
  );
};

export default Settings;
