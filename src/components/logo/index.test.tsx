import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Logo from '.';

describe('Logo Component', () => {
  it('should render the logo with default props', () => {
    const { getByAltText } = render(<Logo />);

    const logoImage = getByAltText('Sudoku');
    expect(logoImage).toBeInTheDocument();

    expect(logoImage).toHaveAttribute('src', './img/sudoku.png');
  });

  it('should apply the correct class when mod prop is provided', () => {
    const { container } = render(<Logo mod="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
