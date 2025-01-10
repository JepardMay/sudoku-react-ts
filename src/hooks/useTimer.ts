import { useEffect } from 'react';

export const useTimer = (
  isCompleted: boolean,
  setTimeSpent: React.Dispatch<React.SetStateAction<number>>
) => {
  let timer: NodeJS.Timeout;

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      clearInterval(timer);
    } else if (!isCompleted) {
      timer = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    }
  };
  
  useEffect(() => {
    if (!isCompleted) {
      timer = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isCompleted]);
};
