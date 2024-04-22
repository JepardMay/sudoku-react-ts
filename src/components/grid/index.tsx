import React, { useState, useEffect } from 'react';
import { SudokuData, INPUT_TYPE } from '../../models';
import { FETCH_URL } from '../../api';
import { PencilIcon, EraserIcon, ArrowBack } from '../Icons';
import Logo from '../logo/index';
import Loader from '../loader/index';
import './index.css';

interface Props {
  setGame: (view: boolean) => void;
}

function Grid({setGame}: Props) {
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

  useEffect(() => {
    setLoading(true);

    fetch(FETCH_URL)
      .then((res) => res.json())
      .then((data) => {
        setState(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const checkValidity = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      if (cell instanceof HTMLElement) {
        const rowIndex = Number(cell.dataset.row);
        const cellIndex = Number(cell.dataset.cell);
        if (rowIndex >= 0 && cellIndex >= 0) {
          const rightAnswer =
            state.newboard.grids[0].solution[rowIndex][cellIndex];
          if (Number(cell.textContent) !== rightAnswer) {
            cell.classList.add('mistake');
          } else {
            cell.classList.remove('mistake');
            cell.classList.remove('selected');
            cell.classList.add('locked');
          }
        }
      }
    });
  };

  const onCellClick = (event: React.MouseEvent<HTMLElement>) => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const cells = document.querySelectorAll('.cell');
      switch (inputType) {
        case INPUT_TYPE.CELL_FIRST: {
          cells.forEach((cell) => {
            if (cell instanceof HTMLElement) {
              if (
                cell.dataset.row === target.dataset.row &&
                cell.dataset.cell === target.dataset.cell &&
                !cell.classList.contains('locked')
              ) {
                cell.classList.add('selected');
              } else {
                cell.classList.remove('selected');
              }
            }
          });
          break;
        }
        case INPUT_TYPE.DIGIT_FIRST: {
          const selectedBtn = document.querySelector('.btn-number.selected');

          if (
            selectedBtn &&
            !target.classList.contains('locked') &&
            eraserMode
          ) {
            target.textContent = '';
          } else if (
            selectedBtn &&
            !target.classList.contains('locked') &&
            pencilMode
          ) {
            if (
              !target.querySelector(`.pencil-mark_${selectedBtn.textContent}`)
            ) {
              target.innerHTML += `<span class="pencil-mark pencil-mark_${selectedBtn.textContent}">${selectedBtn.textContent}</span>`;
            } else {
              target
                .querySelector(`.pencil-mark_${selectedBtn.textContent}`)
                ?.remove();
            }
          } else if (selectedBtn && !target.classList.contains('locked')) {
            target.textContent = selectedBtn.textContent;
            checkValidity();
          }
          break;
        }
        default:
          break;
      }
    }
  };

  const onNumberClick = (event: React.MouseEvent<HTMLElement>) => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      switch (inputType) {
        case INPUT_TYPE.CELL_FIRST: {
          const selectedCell = document.querySelector('.cell.selected');
          if (selectedCell && eraserMode) {
            selectedCell.textContent = '';
          } else if (selectedCell && pencilMode) {
            if (
              !selectedCell.querySelector(`.pencil-mark_${target.textContent}`)
            ) {
              selectedCell.innerHTML += `<span class="pencil-mark pencil-mark_${target.textContent}">${target.textContent}</span>`;
            } else {
              selectedCell
                .querySelector(`.pencil-mark_${target.textContent}`)
                ?.remove();
            }
          } else if (selectedCell) {
            selectedCell.textContent = target.textContent;
            checkValidity();
          }
          break;
        }
        case INPUT_TYPE.DIGIT_FIRST: {
          const numBtns = document.querySelectorAll('.btn');
          numBtns.forEach((btn) => {
            if (btn === target) {
              btn.classList.add('selected');
            } else {
              btn.classList.remove('selected');
            }
          });
          break;
        }
        default:
          break;
      }
    }
  };

  const renderRow = (value: [number], rowIndex: number) => {
    return (
      <tr className="row" key={`row: ${rowIndex + 1}`}>
        {value.map((value, cellIndex) =>
          renderCell(value, cellIndex, rowIndex),
        )}
      </tr>
    );
  };

  const renderCell = (value: number, cellIndex: number, rowIndex: number) => {
    return (
      <td
        className={value !== 0 ? 'cell locked' : 'cell'}
        key={`cell: ${cellIndex + 1 + rowIndex * 9}`}
        data-row={rowIndex}
        data-cell={cellIndex}
        onClick={onCellClick}
      >
        {value !== 0 ? value : ''}
      </td>
    );
  };

  const header = (
    <header className="Grid-header">
      <button type="button" className="Grid-back-btn" onClick={ () => setGame(false) }>
        <ArrowBack />
      </button>
      <Logo />
      <div
        className={`difficulty difficulty-${state.newboard.grids[0].difficulty.toLowerCase()}`}
      >
        <img src="./img/lock.png" alt="Lock" width="32" height="32" />
        <img src="./img/lock.png" alt="Lock" width="32" height="32" />
        <img src="./img/lock.png" alt="Lock" width="32" height="32" />
      </div>
    </header>
  );

  const table = (
    <table className="Grid-table">
      <tbody>
        {state.newboard.grids[0].value.map((value, rowIndex) =>
          renderRow(value, rowIndex),
        )}
      </tbody>
    </table>
  );

  const buttons = [];
  for (let i = 1; i <= 9; i++) {
    buttons.push(
      <button
        type="button"
        className="btn btn-number"
        key={`button: ${i}`}
        onClick={onNumberClick}
      >
        {i}
      </button>,
    );
  }

  const footer = (
    <footer className="Grid-footer">
      {buttons}
      <button
        type="button"
        className={pencilMode ? 'btn selected' : 'btn'}
        onClick={() => setPencilMode(!pencilMode)}
      >
        <PencilIcon />
      </button>
      <button
        type="button"
        className={
          eraserMode && inputType === INPUT_TYPE.DIGIT_FIRST
            ? 'btn selected'
            : 'btn'
        }
        onClick={() => setEraserMode(!eraserMode)}
      >
        <EraserIcon />
      </button>
      <button
        type="button"
        className="btn btn-text"
        onClick={() =>
          inputType === INPUT_TYPE.DIGIT_FIRST
            ? setInputType(INPUT_TYPE.CELL_FIRST)
            : setInputType(INPUT_TYPE.DIGIT_FIRST)
        }
      >
        {inputType}
      </button>
    </footer>
  );

  const grid = (
    <>
      {header}
      {table}
      {footer}
    </>
  );

  return <section className="Grid">{loading ? <Loader loading /> : grid}</section>;
}

export default Grid;
