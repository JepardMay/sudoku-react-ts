import { useState } from 'react';
import { SudokuData, INPUT_TYPE } from '../../models';

const useSudokuState = () => {
  const [state, setState] = useState<SudokuData>({
    newboard: {
      grids: [
        {
          difficulty: '',
          solution: [[0]],
          value: [[0]],
        },
      ],
      message: '',
      results: 0,
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [inputType, setInputType] = useState<string>(INPUT_TYPE.DIGIT_FIRST);
  const [pencilMode, setPencilMode] = useState<boolean>(false);
  const [eraserMode, setEraserMode] = useState<boolean>(false);

  return {
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
  };
};

export default useSudokuState;
