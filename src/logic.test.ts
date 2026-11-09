import { describe, it, expect } from 'vitest';
import { createDigitValidator } from './logic.js';
import { isValidGuess } from './logic.js';

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
