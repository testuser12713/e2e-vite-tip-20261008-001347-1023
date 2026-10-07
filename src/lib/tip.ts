import type { TipFormState, TipInput, TipResult, ValidationError } from '../types';

export function calculateTip(_input: TipInput): TipResult {
  return { tip: 0, total: 0, perPerson: 0 };
}

export function validateTipInput(_state: TipFormState): ValidationError | null {
  return null;
}
