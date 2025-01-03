import styled from 'styled-components';

export const SettingsList = styled.ul`
  margin: 0;
  padding: 0;
  padding-left: 20px;
  list-style: none;
`;

export const SettingsItem = styled.li`
  margin-bottom: 10px;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SettingsBtn = styled.button`
  padding: 0;
  font: inherit;
  font-size: 18px;
  color: var(--text-color);
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: color var(--default-transition);

  @media (hover: hover) and (pointer: fine) {
    &:hover { 
      color: var(--border-color);
    }
  }
`;
