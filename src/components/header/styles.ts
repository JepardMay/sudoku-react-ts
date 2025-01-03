import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 0 80px;
`;

export const HeaderWrapper = styled.div`
  position: relative;
  max-width: calc(var(--cell-width) * 11.8);
  margin: 0 auto;
`;

export const Btn = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 0;
  color: var(--border-color);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color var(--default-transition);

  svg {
    width: 100%;
    height: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover, 
    &:focus { 
      color: var(--active-color);
    }
  }
`;

export const BackBtn = styled(Btn)`
  top: 85px;
  left: 80px;
  transform: rotate(90deg);

  @media (max-width: 768px) {
    top: 50px;
    left: 10px
  }
`;

export const Difficulty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  & img {
    width: 32px;
    height: 32px;
  }

  &.easy img:first-child ~ img,
  &.medium img:nth-child(2) ~ img,
  &.hard img:nth-child(3) ~ img { 
    filter: grayscale(100%) contrast(30%);
  }

  @media (max-width: 768px) {
    & img {
      width: 28px;
      height: 28px;
    }
  }
`;

export const SettingsBtn = styled(Btn)`
  right: 0;
  bottom: 0;
  width: 32px;
  height: 32px;
  border: 2px solid var(--border-color);

  @media (max-width: 768px) {
    right: -74px;
    width: 28px;
    height: 28px;
  }

  @media (max-width: 375px) {
    right: -68px;
  }
`;
