import type { Base, GuessResult } from './types.js';

export function createDigitValidator(base: Base): (char: string) => boolean {
  const digits = '0123456789abcdef'.slice(0, base);

  return (char) => {
    if (char.length !== 1) return false;
    return digits.includes(char.toLowerCase());
  };
}

export function isValidGuess(
  guess: string,
  length: number,
  base: Base,
): boolean {
  if (guess.length !== length) return false;

  const digitValidator = createDigitValidator(base);
  const isBasedDigits = guess.split('').every(digitValidator);

  if (!isBasedDigits) return false;

  const uniqueDigits = new Set(guess.toLowerCase());

  return guess.length === uniqueDigits.size;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function evaluateGuess(secret: string, guess: string): GuessResult {
  return { bulls: 0, cows: 0 };
}
/* eslint-enable @typescript-eslint/no-unused-vars */
