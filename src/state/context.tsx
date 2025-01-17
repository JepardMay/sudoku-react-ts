import React, { createContext, ReactNode, useReducer, useMemo } from 'react';
import { StateContextType } from '../models';
import { getInitialState } from './initialState';
import { stateReducer } from './reducers';

const StateContext = createContext<StateContextType | undefined>(undefined);

const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, getInitialState());

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};

export { StateContext, StateProvider };
