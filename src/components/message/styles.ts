import styled from 'styled-components';

export const MessageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: var(--overlay-color);
`;

export const MessageWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  padding: 30px;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
`;

export const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 150px; 
  margin: 0 auto;
  padding: 10px;
  font: inherit;
  font-size: 16px;
  color: var(--text-color);
  background-color: transparent;
  border: 2px solid var(--border-color);
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color var(--default-transition),
    color var(--default-transition);

  @media (hover: hover) and (pointer: fine) {
    &:hover { 
      color: var(--background-color);
      background-color: var(--active-color);
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`; 
