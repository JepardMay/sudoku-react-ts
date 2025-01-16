export enum INPUT_TYPE {
  DIGIT_FIRST = 'Digit first',
  CELL_FIRST = 'Cell first',
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | undefined;

export interface ThemeSettings {
  nightTheme: boolean;
  setNightTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HighlightSettings {
  isHighlighting: boolean;
  setIsHighlighting: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TimerSettings {
  isTimerHidden: boolean;
  setIsTimerHidden: React.Dispatch<React.SetStateAction<boolean>>;
}
