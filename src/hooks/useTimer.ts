import { useEffect, useRef, useCallback } from 'react';
import { ACTION_TYPE } from '../models';
import { useInitializeState } from './useInitializeState';

export const useTimer = () => {
  const { state, dispatch } = useInitializeState();
  const { game, completed, timeSpent } = state;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      const newTimeSpent = timeSpent + 1;
      dispatch({ type: ACTION_TYPE.SET_TIME_SPENT, payload: newTimeSpent });
    }, 1000);
  }, [timeSpent, dispatch]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      clearTimer();
    } else if (!completed && game) {
      startTimer();
    }
  }, [completed, clearTimer, startTimer]);

  useEffect(() => {
    if (!completed && game) {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [completed, handleVisibilityChange, clearTimer, startTimer]);

};
