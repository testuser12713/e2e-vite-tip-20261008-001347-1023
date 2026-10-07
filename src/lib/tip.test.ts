import { describe, expect, it } from 'vitest';
import { calculateTip, validateTipInput } from './tip';
import type { TipFormState } from '../types';

function formState(amount: string, tipPercent: string, people: string): TipFormState {
  return {
    amount,
    tipPercent,
    people,
    touched: { amount: false, tipPercent: false, people: false },
    submitted: false,
  };
}

describe('calculateTip', () => {
  it('computes tip, total and per-person for a valid input', () => {
    const result = calculateTip({ amount: 100, tipPercent: 10, people: 2 });
    expect(result).toEqual({ tip: 10, total: 110, perPerson: 55 });
  });

  it('rounds every value to whole cents', () => {
    const result = calculateTip({ amount: 99.99, tipPercent: 15, people: 3 });
    expect(result.tip).toBe(15);
    expect(result.total).toBe(114.99);
    expect(result.perPerson).toBe(38.33);
  });

  it('rounds half a cent up', () => {
    const result = calculateTip({ amount: 1.05, tipPercent: 50, people: 1 });
    expect(result.tip).toBe(0.53);
    expect(result.total).toBe(1.58);
    expect(result.perPerson).toBe(1.58);
  });

  it('handles a zero tip percent', () => {
    const result = calculateTip({ amount: 20, tipPercent: 0, people: 4 });
    expect(result).toEqual({ tip: 0, total: 20, perPerson: 5 });
  });
});

describe('validateTipInput', () => {
  it('returns null for a fully valid input', () => {
    expect(validateTipInput(formState('100', '10', '2'))).toBeNull();
  });

  it('accepts boundary tip percent and people values', () => {
    expect(validateTipInput(formState('100', '0', '1'))).toBeNull();
    expect(validateTipInput(formState('100', '100', '5'))).toBeNull();
  });

  it('rejects an empty amount', () => {
    expect(validateTipInput(formState('', '10', '2'))?.field).toBe('amount');
  });

  it('rejects a non-numeric amount', () => {
    expect(validateTipInput(formState('abc', '10', '2'))?.field).toBe('amount');
  });

  it('rejects a negative amount', () => {
    expect(validateTipInput(formState('-5', '10', '2'))?.field).toBe('amount');
  });

  it('rejects a tip percent above 100', () => {
    expect(validateTipInput(formState('100', '150', '2'))?.field).toBe('tipPercent');
  });

  it('rejects a negative tip percent', () => {
    expect(validateTipInput(formState('100', '-1', '2'))?.field).toBe('tipPercent');
  });

  it('rejects zero people', () => {
    expect(validateTipInput(formState('100', '10', '0'))?.field).toBe('people');
  });

  it('rejects a fractional people count', () => {
    expect(validateTipInput(formState('100', '10', '1.5'))?.field).toBe('people');
  });

  it('reports the first invalid field in order', () => {
    expect(validateTipInput(formState('', '150', '0'))?.field).toBe('amount');
  });
});
