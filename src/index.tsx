import React from 'react';
import ReactDOM from 'react-dom/client';

import 'normalize.css';
import GlobalStyles from './GlobalStyles';

import { StateProvider } from './state/context';

import App from './components/app';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <StateProvider>
      <GlobalStyles/>
      <App />
    </StateProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
