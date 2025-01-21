import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ACTION_TYPE } from '../../models';
import { useInitializeState } from '../../hooks/useInitializeState';
import useSudokuState from '../../hooks/useSudokuState';
import useGetSudoku from '../../hooks/useGetSudoku';
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

  useGSAP(() => {
    const element = document.querySelector('.fade-in');
    gsap.from(element, {
      scale: 0.9,
      y: 100,
      opacity: 0,
      onComplete: () => {
        if (element) {
          element.removeAttribute('style');
        }
        gsap.to('.back-btn', {
          opacity: 1
        });
      }
    }); 
     
    gsap.from('.pop-in', {
      scale: 0,
      opacity: 0,
      stagger: 0.02,
      ease: "elastic.out(1,0.5)",
    });
  });

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
