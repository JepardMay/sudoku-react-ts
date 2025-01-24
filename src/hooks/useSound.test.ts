import { renderHook, act } from '@testing-library/react';
import { useSound } from './useSound';

describe('useSound', () => {
  let playMock: jest.Mock;
  let pauseMock: jest.Mock;

  beforeEach(() => {
    playMock = jest.fn(() => Promise.resolve());
    pauseMock = jest.fn();

    global.Audio = jest.fn().mockImplementation(() => ({
      play: playMock,
      pause: pauseMock,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an audio instance with the provided URL', () => {
    const url = 'test-url.mp3';
    const mute = false;

    renderHook(() => useSound(url, mute));

    expect(global.Audio).toHaveBeenCalledWith(url);
  });

  it('should play the audio when mute is false', () => {
    const url = 'test-url.mp3';
    const mute = false;

    const { result } = renderHook(() => useSound(url, mute));

    act(() => {
      result.current();
    });

    expect(playMock).toHaveBeenCalled();
  });

  it('should not play the audio when mute is true', () => {
    const url = 'test-url.mp3';
    const mute = true;

    const { result } = renderHook(() => useSound(url, mute));

    act(() => {
      result.current();
    });

    expect(playMock).not.toHaveBeenCalled();
  });
});
