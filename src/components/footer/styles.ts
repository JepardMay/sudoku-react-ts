import styled from 'styled-components';

interface BtnProps {
  btnType?: string;
}

export const FooterContainer = styled.footer`
  display: grid;
  grid-template-rows: repeat(6, calc(var(--cell-width) * 1.238));
  grid-auto-flow: column;
  gap: 1rem;
  margin: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(6, calc(var(--cell-width) * 1.238));
    grid-template-rows: none;
    grid-auto-flow: row;
    gap: 0.75rem;
    margin: 1rem 0;
  }
`;

export const FooterBtn = styled.button<BtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font: inherit;
  font-size: ${({ btnType }) => btnType === 'text' ? '15px': '24px'};
  color: var(--text-color);
  background-color: transparent;
  border: 2px solid var(--border-color);
  text-transform: uppercase;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: background-color 200ms ease-in,
    color 200ms ease-in;

  &.selected {
    color: var(--background-color);
    background-color: var(--active-color);
  }

  svg {
    width: 25px;
    height: 25px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(.selected):hover,
    &:not(.selected):focus {
      background-color: var(--active-color-transparent);
    }
  }
  
  @media (max-width: 768px) {
    font-size: ${({ btnType }) => btnType === 'text' ? '10px' : '18px'};
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;