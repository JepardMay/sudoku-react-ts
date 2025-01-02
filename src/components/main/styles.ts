import styled from 'styled-components';

export const MainBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 250px; 
  margin: 0 auto;
  padding: 20px;
  font: inherit;
  font-size: 26px;
  color: var(--text-color);
  background-color: transparent;
  border: 2px solid var(--border-color);
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color var(--default-transition),
    color var(--default-transition);

  & {
    margin-top: 15px;
  }

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

export const BtnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 15px;
`;

export const SmallBtn = styled(MainBtn)`
  padding: 10px;
  font-size: 18px;

  & {
    margin-top: 0;
  }
`;