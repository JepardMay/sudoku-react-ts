import React from 'react';
import { ACTION_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import useSudokuState from '../../hooks/useSudokuState';
import useGetSudoku from '../../hooks/useGetSudoku';
import { useAnimations } from '../../hooks/useAnimations';
import { removeSavedStorage } from '../../utils/storageUtils';
import Header from '../header';
import Table from '../table';
import Footer from '../footer';
import { CompletionModal } from './modals';

import { GridSection } from './styles';

function Grid() {
  const { state, dispatch } = useInitializeState();
  const { completed, timeSpent } = state;

  const {
    setNumber,
    validateEntireGrid,
    handleSolvingSudoku,
    getHint,
    reset,
    resetPencilMarks,
    undo, 
    redo,
  } = useSudokuState();

  useGetSudoku();

  const onModalClose = () => {
    dispatch({ type: ACTION_TYPE.SET_GAME, payload: false });
    dispatch({ type: ACTION_TYPE.SET_RESUME, payload: false });
    dispatch({ type: ACTION_TYPE.SET_IS_COMPLETED, payload: false });
    removeSavedStorage('timeSpent');
  };

  useAnimations({ fadeIn: true, popIn: true });

  return (
    <GridSection className="fade-in">
      <>
        <Header 
          validateEntireGrid={validateEntireGrid}
          handleSolvingSudoku={handleSolvingSudoku}
          getHint={getHint}
          reset={reset}
          resetPencilMarks={resetPencilMarks}
          undo={undo}
          redo={redo}
        />
        <Table
          setNumber={setNumber}
        />
        <Footer
          setNumber={setNumber}
        />
        <CompletionModal
          show={completed}
          timeSpent={timeSpent}
          onClose={onModalClose}
        />
      </>
    </GridSection>
  );
}

export default Grid;
