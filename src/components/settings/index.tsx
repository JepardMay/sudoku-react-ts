import React, { useState } from 'react';

import { SettingsList, SettingsItem, SettingsBtn, Toggle } from './styles';

const Settings = () => {
  const [activeToggles, setActiveToggles] = useState<{ [key: number]: boolean; }>({});

  const settings = [
    {
      text: 'Validate the Puzzle',
      onClick: () => {}
    },
    {
      text: 'Solve the Puzzle',
      onClick: () => {}
    },
    {
      text: 'Highlight crossing',
      onClick: () => { 
      },
      toggle: true
    },
  ];

   const handleToggleClick = (index: number) => {
    setActiveToggles((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <SettingsList>
      { settings.map((el, i) =>
        <SettingsItem key={ `setting-${i + 1}` }>
          <SettingsBtn
            className={ activeToggles[i] ? 'active' : '' }
            onClick={ () => {
              handleToggleClick(i);
              el.onClick();
            }}>
            <span>{ el.text }</span>
            {el.toggle && <Toggle/>}
          </SettingsBtn>
        </SettingsItem>)
      }
    </SettingsList>
  );
};

export default Settings;
