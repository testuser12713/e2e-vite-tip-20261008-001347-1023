import type { TipFormState, TipInput, TipResult, ValidationError } from '../types';

function roundToCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : null;
}

export function calculateTip(input: TipInput): TipResult {
  const tip = (input.amount * input.tipPercent) / 100;
  const total = input.amount + tip;
  const perPerson = total / input.people;

  return {
    tip: roundToCents(tip),
    total: roundToCents(total),
    perPerson: roundToCents(perPerson),
  };
}

export function validateTipInput(state: TipFormState): ValidationError | null {
  const amount = parseNumber(state.amount);
  if (amount === null) {
    return { field: 'amount', message: 'Bitte einen gültigen Betrag eingeben.' };
  }
  if (amount < 0) {
    return { field: 'amount', message: 'Der Betrag darf nicht negativ sein.' };
  }

  const tipPercent = parseNumber(state.tipPercent);
  if (tipPercent === null) {
    return { field: 'tipPercent', message: 'Bitte ein gültiges Trinkgeld-Prozent eingeben.' };
  }
  if (tipPercent < 0 || tipPercent > 100) {
    return { field: 'tipPercent', message: 'Das Trinkgeld-Prozent muss zwischen 0 und 100 liegen.' };
  }

  const people = parseNumber(state.people);
  if (people === null) {
    return { field: 'people', message: 'Bitte eine gültige Personenzahl eingeben.' };
  }
  if (people < 1 || !Number.isInteger(people)) {
    return { field: 'people', message: 'Die Personenzahl muss eine ganze Zahl ab 1 sein.' };
  }

  return null;
}
