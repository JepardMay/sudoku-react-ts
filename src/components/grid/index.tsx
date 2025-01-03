import React, { useEffect } from 'react';
import useSudokuState from '../hooks/useSudokuState';
import useFetchSudokuData from '../hooks/useFetchSudokuData';
import Loader from '../loader';
import Header from '../header';
import Table from '../table';
import Footer from '../footer';
import Modal from '../modal';

import { GridSection, Btn } from './styles';

interface Props {
  resume: boolean;
  setResume: (view: boolean) => void;
  setGame: (view: boolean) => void;
  setError: (error: string) => void;
  difficulty: string;
}

function Grid({
  resume,
  setResume,
  setGame,
  setError,
  difficulty
}: Readonly<Props>) {
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
    conflictingCells,
    isCompleted,
    numberCounts,
  } = useSudokuState();

  useFetchSudokuData({
    state,
    setState,
    setLoading,
    shouldFetch: !resume,
    chosenDifficulty: difficulty,
    setGame,
    setError
  });
  
  useEffect(() => {
    if (resume) {
      setLoading(false);
    }
  }, [resume, setLoading]);
  
  useEffect(() => {
    if (isCompleted) {
      localStorage.removeItem('sudokuState');
      setResume(false);
    }
  }, [isCompleted, setResume]);

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
            numberCounts={numberCounts}
          />
          { isCompleted && <Modal
            title='Congratulations!'
            message='You have successfully completed the Sudoku puzzle.'
            onClose={() => setGame(false)}
            showConfetti
          >
            <Btn onClick={() => setGame(false)}>Back to Main</Btn>
          </Modal>}
        </>
      )}
    </GridSection>
  );
}

export default React.memo(Grid);
