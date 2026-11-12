export type Base = 2 | 8 | 10 | 16;
export type GuessResult = {
  readonly bulls: number;
  readonly cows: number;
};
export type RandomSource = () => number;
export type Settings = {
  readonly length: number;
  readonly base: Base;
};
export type HistoryEntry = GuessResult & {
  readonly guess: string;
};
export type GameStatus = 'set up' | 'play' | 'win';
export type GameState = {
  readonly status: GameStatus;
  readonly settings: Settings;
  readonly secret: string;
  readonly history: readonly HistoryEntry[];
  readonly startTime: number;
};
