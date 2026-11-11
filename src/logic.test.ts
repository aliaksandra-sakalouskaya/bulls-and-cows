import { describe, it, expect } from 'vitest';
import {
  createDigitValidator,
  isValidGuess,
  evaluateGuess,
  generateSecret,
} from './logic.js';

describe('createDigitValidator', () => {
  it('accepts 1 in binary', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('1')).toBe(true);
  });

  it('rejects 5 in binary', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('5')).toBe(false);
  });

  it('accepts 7 in octal system', () => {
    const isOctalDigit = createDigitValidator(8);
    expect(isOctalDigit('7')).toBe(true);
  });

  it('rejects 8 in octal system', () => {
    const isOctalDigit = createDigitValidator(8);
    expect(isOctalDigit('8')).toBe(false);
  });

  it('rejects two characters at once', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(isDecimalDigit('12')).toBe(false);
  });

  it('rejects a in decimal system', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(isDecimalDigit('a')).toBe(false);
  });

  it('accepts a in hexadecimal system', () => {
    const isHexadecimalDigit = createDigitValidator(16);
    expect(isHexadecimalDigit('a')).toBe(true);
  });

  it('accepts A in hexadecimal system', () => {
    const isHexadecimalDigit = createDigitValidator(16);
    expect(isHexadecimalDigit('A')).toBe(true);
  });

  it('rejects empty string in hexadecimal system', () => {
    const isHexadecimalDigit = createDigitValidator(16);
    expect(isHexadecimalDigit('')).toBe(false);
  });
});

describe('isValidGuess', () => {
  it('rejects a guess shorter than the chosen length', () => {
    expect(isValidGuess('1234', 6, 10)).toBe(false);
  });

  it('rejects a guess longer than the chosen length', () => {
    expect(isValidGuess('1234', 2, 16)).toBe(false);
  });

  it('accepts a valid guess', () => {
    expect(isValidGuess('01', 2, 2)).toBe(true);
  });

  it('rejects an empty guess', () => {
    expect(isValidGuess('', 2, 16)).toBe(false);
  });

  it('rejects a guess with a digit outside the base', () => {
    expect(isValidGuess('a678', 4, 10)).toBe(false);
  });

  it('accepts hex letters in hexadecimal', () => {
    expect(isValidGuess('0f5a31', 6, 16)).toBe(true);
  });

  it('accepts uppercase hex letters', () => {
    expect(isValidGuess('A5431', 5, 16)).toBe(true);
  });

  it('rejects a guess with repeated digits', () => {
    expect(isValidGuess('ff4521', 6, 16)).toBe(false);
  });

  it('treats a and A as the same digit', () => {
    expect(isValidGuess('aA4521', 6, 16)).toBe(false);
  });
});

describe('evaluateGuess', () => {
  it('returns zero bulls and cows when no digits match', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  it('finds two bulls and zero cows', () => {
    expect(evaluateGuess('1234', '1256')).toEqual({ bulls: 2, cows: 0 });
  });

  it('finds only cows', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  it('finds one bull and two cows', () => {
    expect(evaluateGuess('1234', '1325')).toEqual({ bulls: 1, cows: 2 });
  });

  it('returns exact match', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  it('returns a full match despite case differences in hex', () => {
    expect(evaluateGuess('a1b2', 'A1B2')).toEqual({ bulls: 4, cows: 0 });
  });

  it('counts cows in a two-digit guess', () => {
    expect(evaluateGuess('07', '70')).toEqual({ bulls: 0, cows: 2 });
  });
});

describe('generateSecret', () => {
  it('generates a valid secret of the first digits', () => {
    expect(generateSecret(4, 10, () => 0)).toBe('0123');
  });

  it('generates a valid secret of the last digits', () => {
    expect(generateSecret(4, 10, () => 0.99)).toBe('9876');
  });

  it('generates a valid binary secret', () => {
    const secret = generateSecret(2, 2);
    expect(isValidGuess(secret, 2, 2)).toBe(true);
  });

  it('generates a valid hex secret', () => {
    const secret = generateSecret(4, 16);
    expect(isValidGuess(secret, 4, 16)).toBe(true);
  });
});
