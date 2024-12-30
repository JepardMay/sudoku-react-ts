import React, { useEffect } from 'react';
import useSudokuState from '../hooks/useSudokuState';
import useFetchSudokuData from '../hooks/useFetchSudokuData';
import Loader from '../loader';
import Header from '../header';
import Table from '../table';
import Footer from '../footer';

import { GridSection } from './styles';

interface Props {
  resume: boolean;
  setResume: (view: boolean) => void;
  setGame: (view: boolean) => void;
}

function Grid({ resume, setResume, setGame }: Readonly<Props>) {
  const {
    state,
    setState,
    loading,
    setLoading,
    inputType,
    setInputType,
    selectedNumber,
    setSelectedNumber,
    selectedCell,
    setSelectedCell,
    pencilMode,
    setPencilMode,
    eraserMode,
    setEraserMode,
    setNumber,
    conflictingCells
  } = useSudokuState();

  useFetchSudokuData(setState, setLoading, !resume);
  
  useEffect(() => {
    if (resume) {
      setLoading(false);
    }
  }, [resume, setLoading]);

  return (
    <GridSection>
      {loading ? <Loader loading={loading} /> : (
        <>
          <Header setResume={setResume} setGame={setGame} difficulty={state.newboard.grids[0].difficulty} />
          <Table
            data={state}
            inputType={inputType}
            eraserMode={eraserMode}
            selectedNumber={selectedNumber}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            setNumber={setNumber}
            setState={setState}
            conflictingCells={conflictingCells}
          />
          <Footer
            pencilMode={pencilMode}
            setPencilMode={setPencilMode}
            eraserMode={eraserMode}
            setEraserMode={setEraserMode}
            inputType={inputType}
            setInputType={setInputType}
            selectedNumber={selectedNumber}
            setSelectedNumber={setSelectedNumber}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            setNumber={setNumber}
            setState={setState}
          />
        </>
      )}
    </GridSection>
  );
}

export default React.memo(Grid);
