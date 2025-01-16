import React, { useState, useEffect } from 'react';
import useSudokuState from '../../hooks/useSudokuState';
import useGetSudoku from '../../hooks/useGetSudoku';
import { Difficulty } from '../../models';
import { setStorage, getStorage, removeSavedStorage } from '../../utils/storageUtils';
import Loader from '../loader';
import Header from '../header';
import Table from '../table';
import Footer from '../footer';
import { CompletionModal } from './modals';

import { GridSection } from './styles';

interface Props {
  resume: boolean;
  setResume: React.Dispatch<React.SetStateAction<boolean>>;
  setGame: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  difficulty: Difficulty;
  nightTheme: boolean;
  setNightTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

function Grid({
  resume,
  setResume,
  setGame,
  setError,
  difficulty,
  nightTheme,
  setNightTheme,
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
    timeSpent,
    setTimeSpent,
  } = useSudokuState();

  useGetSudoku({
    state,
    setState,
    setLoading,
    setTimeSpent,
    isCompleted,
    resume,
    chosenDifficulty: difficulty,
    setGame,
    setError
  });

  const [isHighlighting, setIsHighlighting] = useState<boolean>(() => getStorage<boolean>('isHighlighting', false));
  
  useEffect(() => {
    if (resume) {
      setLoading(false);
    }
  }, [resume, setLoading]);
  
  useEffect(() => {
    setStorage('isHighlighting', String(isHighlighting));
  }, [isHighlighting]);
  
  useEffect(() => {
    if (isCompleted) {
      removeSavedStorage('sudokuState');
      setResume(false);
    }
  }, [isCompleted, setResume]);

  const onModalClose = () => {
    setGame(false);
    removeSavedStorage('timeSpent');
  };

  return (
    <GridSection>
      {loading ? <Loader loading={loading} /> : (
        <>
          <Header 
            setResume={setResume} 
            setGame={setGame} 
            difficulty={state.difficulty} 
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
            nightTheme={nightTheme}
            setNightTheme={setNightTheme}
            timeSpent={timeSpent}
          />
          <Table
            state={state}
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
          <CompletionModal
            show={isCompleted}
            timeSpent={timeSpent}
            onClose={onModalClose}
          />
        </>
      )}
    </GridSection>
  );
}

export default Grid;
