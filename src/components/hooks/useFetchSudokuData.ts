import { useEffect } from 'react';
import { FETCH_URL } from '../../api';
import { SudokuData } from '../../models';

const useFetchSudokuData = (setState: React.Dispatch<React.SetStateAction<SudokuData>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  useEffect(() => {
    setLoading(true);

    fetch(FETCH_URL)
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      })
      .catch((err) => {
        console.log(err.message);
      }).finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  }, [setState, setLoading]);
};

export default useFetchSudokuData;
