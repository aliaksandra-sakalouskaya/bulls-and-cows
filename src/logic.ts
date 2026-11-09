import type { Base } from './types.js';

export function createDigitValidator(base: Base): (char: string) => boolean {
  const digits = '0123456789abcdef'.slice(0, base);

  return (char) => {
    if (char.length !== 1) return false;
    return digits.includes(char.toLowerCase());
  };
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function isValidGuess(
  guess: string,
  length: number,
  base: Base,
): boolean {
  return true;
}
/* eslint-disable @typescript-eslint/no-unused-vars */
