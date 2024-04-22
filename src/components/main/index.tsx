import React from 'react';
import Logo from '../logo';

import './index.css';

interface Props {
  setGame: (view: boolean) => void;
}

function Main({setGame}:Props) {
  return (
    <div className="Main">
      <Logo mod={ 'big' } />
      <button className="Main-btn" type="button" onClick={ () => setGame(true) }>Play</button>
    </div>
  );
}

export default Main;
