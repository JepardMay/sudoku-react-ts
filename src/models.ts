export enum INPUT_TYPE {
  DIGIT_FIRST = 'Digit first',
  CELL_FIRST = 'Cell first',
}

export interface SudokuData {
  newboard: {
    grids: [
      {
        difficulty: string;
        solution: [[number]];
        value: [[number]];
      },
    ];
    message: string;
    results: number;
  };
}
