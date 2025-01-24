import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from '../loader';
import useImagePreloader from '../../hooks/useImagePreloader';

jest.mock('../../hooks/useImagePreloader');

const useImagePreloaderMock = useImagePreloader as jest.MockedFunction<typeof useImagePreloader>;

describe('Loader Component', () => {
  beforeEach(() => {
    useImagePreloaderMock.mockClear();
  });

  it('should render the loader with images', () => {
    const { getAllByAltText } = render(<Loader onLoadComplete={jest.fn()} />);
    
    const letters = ['U', 'K', 'O', 'D', 'U', 'S'];
    letters.forEach(letter => {
      expect(getAllByAltText(letter).length).toBeGreaterThan(0);
    });
  });

  it('should call useImagePreloader with correct arguments', () => {
    const onLoadCompleteMock = jest.fn();
    render(<Loader onLoadComplete={onLoadCompleteMock} />);

    expect(useImagePreloaderMock).toHaveBeenCalledWith(
      [
        './img/letters/u-2.png',
        './img/letters/k.png',
        './img/letters/o.png',
        './img/letters/d.png',
        './img/letters/u-1.png',
        './img/letters/s.png'
      ],
      onLoadCompleteMock
    );
  });
});
