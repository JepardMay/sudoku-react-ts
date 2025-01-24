import React, { Suspense } from 'react';
import { ACTION_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import { usePersistState } from '../../hooks/usePersistState';
import Loader from '../loader';

import { Container } from './styles';

const Main = React.lazy(() => import('../main/index'));
const Grid = React.lazy(() => import('../grid/index'));

function App() {
  const { state, dispatch } = useInitializeState();
  const { loading, game } = state;

  const view = game ? <Grid /> : <Main />;

  usePersistState();

  const handleLoadComplete = () => {
    setTimeout(() => {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }, 2500);
  };

  return (
    <Container>
      <Suspense fallback={<Loader onLoadComplete={ handleLoadComplete }/>}>
        {
          loading ?
          <Loader onLoadComplete={ handleLoadComplete } /> :
          view
        }
      </Suspense>
    </Container>
  );
}

export default App;
