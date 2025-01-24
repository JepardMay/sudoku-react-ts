# Sudoku App

## Project Description

This Sudoku App is a web-based application that allows users to play and solve Sudoku puzzles. It provides an interactive grid, multiple difficulty levels, and various features.

## Live Site URL: [Netlify](tiny-sudoku.netlify.app/)

## Features

- **Interactive Grid**: A user-friendly interface to input and solve Sudoku puzzles.
- **Multiple Difficulty Levels**: Choose from four difficulty levels or let the app select a random difficulty for you.
- **Save & Resume**: Save your game state and resume later.
- **Timer**: Track your time while solving Sudoku puzzles.
- **Score History**: View your latest and best scores for each difficulty level (best scores are saved only if solved without helpers).
- **Input Modes**: Switch between cell-first and digit-first input modes.
- **Pencil Marks**: Add pencil marks to cells for notes.
- **Hints**: Get hints to assist in solving the puzzle.
- **Puzzle Validation**: Validate your solution.
- **Solve**: Automatically solve the puzzle.
- **Reset Options**: Reset the whole puzzle or only clear the pencil marks.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Settings for User Preferences**: Save preferences such as hiding/showing the timer, highlighting crossing cells (for cell-first input), and enabling night theme.

## Technologies Used

- React
- TypeScript
- Styled Components
- [SudokuGen](https://www.npmjs.com/package/sudoku-gen)
- [React Confetti Boom](https://www.npmjs.com/package/react-confetti-boom)
- [GSAP](https://gsap.com/)
- React Transition Group
- Jest

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JepardMay/sudoku-react-ts
   cd sudoku-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```
The app will be available at http://localhost:3000.

## Testing

   ```bash
   npm test
   ```
This will execute the Jest test suite.

## Author

- GitHub: [Veronika Palto](https://github.com/JepardMay)
