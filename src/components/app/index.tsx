import React from 'react';
import { ACTION_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import { usePersistState } from '../../hooks/usePersistState';
import Loader from '../loader';
import Main from '../main/index';
import Grid from '../grid/index';

import { Container } from './styles';

function App() {
  const { state, dispatch } = useInitializeState();
  const { loading, game } = state;

  const view = game ? <Grid /> : <Main />;

  usePersistState();

  const handleLoadComplete = () => {
    setTimeout(() => {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }, 3000);
  };

  return (
    <Container>
      {loading ? <Loader onLoadComplete={handleLoadComplete} /> : view}
    </Container>
  );
}

export default App;
