import React, { useState, useEffect } from 'react';
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
  setResume: React.Dispatch<React.SetStateAction<boolean>>;
  setGame: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
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
    invalidCells,
    validateEntireGrid,
    handleSolvingSudoku,
    getHint,
    reset,
    history,
    redoStack,
    undo, 
    redo,
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

  const [isHighlighting, setIsHighlighting] = useState<boolean>(false);

  return (
    <GridSection>
      {loading ? <Loader loading={loading} /> : (
        <>
          <Header 
            setResume={setResume} 
            setGame={setGame} 
            difficulty={state.newboard.grids[0].difficulty} 
            validateEntireGrid={validateEntireGrid}
            handleSolvingSudoku={handleSolvingSudoku}
            isHighlighting={isHighlighting}
            setIsHighlighting={setIsHighlighting}
            getHint={getHint}
            reset={reset}
            history={history}
            redoStack={redoStack}
            undo={undo}
            redo={redo}
          />
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
            invalidCells={invalidCells}
            isHighlighting={isHighlighting}
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
          <Modal
            show={isCompleted}
            title='Congratulations!'
            message='You have successfully completed the Sudoku puzzle.'
            onClose={() => setGame(false)}
            showConfetti
          >
            <Btn onClick={() => setGame(false)}>Back to Main</Btn>
          </Modal>
        </>
      )}
    </GridSection>
  );
}

export default React.memo(Grid);
