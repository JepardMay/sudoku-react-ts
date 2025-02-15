import styled from 'styled-components';

export const SettingsList = styled.ul`
  margin: 0;
  padding: 0 15px;
  /* list-style: none; */
`;

export const SettingsItem = styled.li`
  position: relative;
  margin-bottom: 10px;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SettingsBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  padding-right: 58px;
  font: inherit;
  font-size: 18px;
  text-align: left;
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

export const Toggle = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  width: 48px;
  height: 24px;
  background-color: var(--active-color-transparent);
  border-radius: 20px;
  transform: translateY(-50%);

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 4px;
    width: 18px;
    height: 18px;
    background-color: var(--active-color);
    border-radius: 50%;
    transition: left var(--default-transition),
      background-color var(--default-transition);
  }

  .active &::before {
    left: calc(100% - 22px);
    background-color: var(--border-color);
  }
`;
