import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --cell-width: 3rem;
    --border-width: 4px;
    --background-color: #f8f8f8;
    --text-color: #000000;
    --border-color: #3a3277;
    --active-color: #6772a9;
    --overlay-color: rgba(0, 0, 0, 0.3);
    --active-color-transparent: #bbc1e5;
    --highlight-color: #d4d9f8;
    --mistake-color: #fe5f55;
    --conflicting-color: #90c9fd;
    --default-transition: 0.15s ease-out;
    --modal-transition: 0.3s ease-in-out;
    --fade-transition: 0.6s ease-in-out;
  }

  .night-theme {
    --text-color: #f8f8f8;
    --background-color: #000000;
    --active-color: #354dc6;
    --active-color-transparent: #5969c2;
    --highlight-color: #434867;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    color: var(--text-color);
    font-family: "Gabarito", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: var(--background-color);
  }

  body::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    background-image:  linear-gradient(var(--active-color) 5px, transparent 5px), linear-gradient(90deg, var(--active-color) 5px, transparent 5px), linear-gradient(var(--active-color) 2.5px, transparent 2.5px), linear-gradient(90deg, var(--active-color) 2.5px, var(--background-color) 2.5px);
    background-size: 125px 125px, 125px 125px, 25px 25px, 25px 25px;
    background-position: -5px -5px, -5px -5px, -2.5px -2.5px, -2.5px -2.5px;
    opacity: 0.1;
  }

  button,
  [type="button"],
  [type="reset"] {
    appearance: none;
  }

  .fade-slide-enter {
    /* opacity: 0; */
    transform: translateY(100px);
  }

  .fade-slide-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity var(--fade-transition), 
      transform var(--fade-transition);
  }

  .fade-slide-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-slide-exit-active {
    /* opacity: 0; */
    transform: translateY(-100px);
    transition: opacity var(--fade-transition), 
      transform var(--fade-transition);
  }

  @media (max-width: 768px) {
    :root {
      --cell-width: 2.5rem;
    }
  }

  @media (max-width: 375px) {
    :root {
      --cell-width: 2.1rem;
    }
  }
`;

export default GlobalStyles;
