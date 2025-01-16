import { useContext } from 'react';
import { StateContext } from '../context/StateContext';

export const useInitializeState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useInitializeState must be used within a StateProvider');
  }
  return context;
};
