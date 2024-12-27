import styled from 'styled-components';

export const MainBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 212px; 
  margin: 0 auto;
  padding: 20px;
  font: inherit;
  font-size: 28px;
  color: var(--text-color);
  background-color: transparent;
  border: 2px solid var(--border-color);
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 200ms ease-in,
    color 200ms ease-in;

  @media (hover: hover) and (pointer: fine) {
    &:hover { 
      color: var(--background-color);
      background-color: var(--active-color);
    }
  }

  @media (max-width: 768px) {
    padding: 18px;
    font-size: 22px;
  }
`; 