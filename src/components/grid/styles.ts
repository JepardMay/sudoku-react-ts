import styled from 'styled-components';

export const GridSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 5px;
  }
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
