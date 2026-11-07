import { describe, it, expect } from 'vitest';
import { createDigitValidator } from './logic.js';

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
