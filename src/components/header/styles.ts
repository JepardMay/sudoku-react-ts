import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 0 80px;
`;

export const BackBtn = styled.button`
  position: absolute;
  top: 80px;
  left: 80px;
  width: 40px;
  height: 40px;
  padding: 0;
  color: var(--border-color);
  background-color: transparent;
  border: none;
  transform: rotate(90deg);
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
