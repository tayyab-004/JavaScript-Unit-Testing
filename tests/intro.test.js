import { describe, it, expect } from 'vitest';
import { max, fizzBuzz, calculateAverage, factorial } from '../src/intro';

describe('max', () => {
  it('should return first argument as greater', () => {
    expect(max(90, 20)).toBe(90);
  });

  it('should return second argument as greater', () => {
    expect(max(20, 90)).toBe(90);
  });

  it('should return first argument as arguments are equal', () => {
    expect(max(90, 90)).toBe(90);
  });
});

describe('fizzBuzz', () => {
  it('should return FizzBuzz if number is divisible by 3 & 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it('should return Fizz if number is divisible by 3', () => {
    expect(fizzBuzz(9)).toBe('Fizz');
  });

  it('should return Buzz if number is divisible by 5', () => {
    expect(fizzBuzz(10)).toBe('Buzz');
  });

  it('should return argument if it is not divisible by 3 or 5', () => {
    expect(fizzBuzz(1)).toBe('1');
  });
});

describe('calculateAverage', () => {
  it('should return NaN if number is empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it('should calculate the average of an array with a single element', () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it('should calculate the average of an array with two elements', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it('should calculate the average of an array with three elements', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe('factorial', () => {
  it('should return 1 if given 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('should return 1 if given 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('should return 2 if given 2', () => {
    expect(factorial(2)).toBe(2);
  });

  it('should return 6 if given 3', () => {
    expect(factorial(3)).toBe(6);
  });

  it('should return 24 if given 4', () => {
    expect(factorial(4)).toBe(24);
  });

  it('should return undefined if given number is negative', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
