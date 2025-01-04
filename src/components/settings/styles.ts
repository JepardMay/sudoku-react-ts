import styled from 'styled-components';

export const SettingsList = styled.ul`
  margin: 0;
  padding: 0 20px;
  list-style: none;
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
    top: 2px;
    left: 2px;
    width: 19px;
    height: 19px;
    background-color: var(--active-color);
    border-radius: 50%;
    transition: left var(--default-transition),
      background-color var(--default-transition);
  }

  .active &::before {
    left: calc(100% - 24px);
    background-color: var(--border-color);
  }
`;
