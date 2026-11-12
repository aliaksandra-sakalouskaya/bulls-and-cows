import type { Base, GuessResult, RandomSource } from './types.js';

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

export function evaluateGuess(secret: string, guess: string): GuessResult {
  const secretDigits = secret.toLowerCase().split('');
  const guessDigits = guess.toLowerCase().split('');

  const bullDigits = secretDigits.filter(
    (digit, index) => digit === guessDigits[index],
  );
  const commonDigits = secretDigits.filter((digit) =>
    guessDigits.includes(digit),
  );

  return {
    bulls: bullDigits.length,
    cows: commonDigits.length - bullDigits.length,
  };
}

function pickDigits(
  available: readonly string[],
  length: number,
  random: RandomSource,
): string {
  if (length === 0) {
    return '';
  }

  const randomIndex = Math.floor(random() * available.length);
  const picked = available[randomIndex];
  const rest = available.filter((item, index) => index !== randomIndex);

  return picked + pickDigits(rest, length - 1, random);
}

export function generateSecret(
  length: number,
  base: Base,
  random: RandomSource = Math.random,
): string {
  const digits = '0123456789abcdef'.slice(0, base).split('');
  return pickDigits(digits, length, random);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function countPossibleSecrets(length: number, base: number): number {
  return 0;
}
/* eslint-enable @typescript-eslint/no-unused-vars */
