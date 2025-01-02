import { useEffect, useRef } from 'react';
import { FETCH_URL } from '../../api';
import { SudokuData, Grid, SudokuFetch } from '../../models';

const transformGridData = (grid: { difficulty: string; solution: number[][]; value: number[][] }): Grid => ({
  difficulty: grid.difficulty,
  solution: grid.solution,
  value: grid.value.map(row => row.map(cellValue => ({
    value: cellValue,
    pencilMarks: [],
    locked: cellValue !== 0,
  }))),
});

const fetchSudokuGrid = async () => {
  const response = await fetch(FETCH_URL);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  return response.json();
};

const fetchGridWithDifficulty = async (chosenDifficulty: string = 'random', maxAttempts: number = 27) => {
  let grid;

  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    grid = await fetchSudokuGrid();

    if (chosenDifficulty === 'random' || grid.newboard.grids[0].difficulty.toLowerCase() === chosenDifficulty) {
      return grid;
    }
  }

  throw new Error(`Failed to find grid with difficulty ${chosenDifficulty} after ${maxAttempts} attempts`);
};

const useFetchSudokuData = ({
  setState,
  setLoading,
  shouldFetch,
  chosenDifficulty,
  setGame,
  setError
}: SudokuFetch) => {
  const hasDataFetched = useRef(false);

  useEffect(() => {
    if (!shouldFetch || hasDataFetched.current) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchGridWithDifficulty(chosenDifficulty);

        // Transform the data to include pencilMarks
        const transformedData: SudokuData = {
          newboard: {
            grids: data.newboard.grids.map((grid: { difficulty: string; solution: number[][]; value: number[][] }) => transformGridData(grid)),
            message: data.newboard.message,
            results: data.newboard.results,
          },
        };

        setState(transformedData);
      } catch(error) {
        console.error('Error fetching data:', error);
        setError((error as Error).message);
        setGame(false);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();

    return () => {
      hasDataFetched.current = true;
    };
  }, [shouldFetch, chosenDifficulty]);
};

export default useFetchSudokuData;
