import { useEffect } from 'react';
import { FETCH_URL } from '../../api';
import { SudokuData, Cell, Grid } from '../../models';

const transformCellValue = (cellValue: number): Cell => ({
  value: cellValue,
  pencilMarks: [],
  locked: cellValue !== 0,
});

const transformRowValues = (row: number[]): Cell[] => row.map(transformCellValue);

const transformGridValues = (rows: number[][]): Cell[][] => rows.map(transformRowValues);

const transformGridData = (grid: { difficulty: string; solution: number[][]; value: number[][] }): Grid => ({
  difficulty: grid.difficulty,
  solution: grid.solution,
  value: transformGridValues(grid.value),
});

const useFetchSudokuData = (setState: React.Dispatch<React.SetStateAction<SudokuData>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, shouldFetch: boolean) => {
  useEffect(() => {
    if (!shouldFetch) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(FETCH_URL);
        const data = await response.json();

        // Transform the data to include pencilMarks
        const transformedData: SudokuData = {
          newboard: {
            grids: data.newboard.grids.map((grid: { difficulty: string; solution: number[][]; value: number[][] }) => transformGridData(grid)),
            message: data.newboard.message,
            results: data.newboard.results,
          },
        };

        setState(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchData().catch(error => console.error('Error fetching data:', error));
  }, [setState, setLoading]);
};

export default useFetchSudokuData;
