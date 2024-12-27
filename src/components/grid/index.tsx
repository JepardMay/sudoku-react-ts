import React from 'react';
import useSudokuState from '../hooks/useSudokuState';
import useFetchSudokuData from '../hooks/useFetchSudokuData';
import Loader from '../loader';
import Header from '../header';
import Table from '../table';
import Footer from '../footer';

import { GridSection } from './styles';

interface Props {
  setGame: (view: boolean) => void;
}

function Grid({setGame}: Readonly<Props>) {
  const {
    state,
    setState,
    loading,
    setLoading,
    inputType,
    setInputType,
    pencilMode,
    setPencilMode,
    eraserMode,
    setEraserMode,
  } = useSudokuState();

  useFetchSudokuData(setState, setLoading);

  return (
    <GridSection>
      {loading ? <Loader loading={loading} /> : (
        <>
          <Header setGame={setGame} difficulty={state.newboard.grids[0].difficulty} />
          <Table data={state} />
          <Footer
            pencilMode={pencilMode}
            setPencilMode={setPencilMode}
            eraserMode={eraserMode}
            setEraserMode={setEraserMode}
            inputType={inputType}
            setInputType={setInputType}
          />
        </>
      )}
    </GridSection>
  );
}

export default Grid;
