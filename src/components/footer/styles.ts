import styled from 'styled-components';

interface BtnProps {
  btnType?: 'text' | 'number';
}

export const FooterContainer = styled.footer`
  display: grid;
  grid-template-rows: repeat(6, calc(var(--cell-width) * 1.238));
  grid-auto-flow: column;
  gap: 1rem;
  margin-left: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(6, calc(var(--cell-width) * 1.26));
    grid-template-rows: none;
    grid-auto-flow: row;
    gap: 0.75rem;
    margin: 1rem 0;
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(6, calc(var(--cell-width) * 1.238));
  }
`;

const filterProps = ({ ...props }: BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => props;

export const FooterBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'btnType',
}).attrs<BtnProps>(filterProps)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font: inherit;
  font-size: ${({ btnType }) => (btnType === 'text' ? '15px' : '24px')};
  color: var(--text-color);
  background-color: transparent;
  border: 2px solid var(--border-color);
  text-transform: uppercase;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: background-color var(--default-transition),
    color var(--default-transition);

  &.selected,
  &.pencil-selected {
    color: var(--background-color);
    background-color: var(--active-color);
  }

  &.pencil-selected svg {
    transform: rotate(45deg);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  svg {
    width: 25px;
    height: 25px;
    transition: transform var(--default-transition);
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(.selected):hover,
    &:not(.selected):focus {
      background-color: var(--active-color-transparent);
    }
  }
  
  @media (max-width: 768px) {
    font-size: ${({ btnType }) => (btnType === 'text' ? '10px' : '18px')};
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const NumberCount = styled.span`
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 10px;
  opacity: 0.8;
`; 
