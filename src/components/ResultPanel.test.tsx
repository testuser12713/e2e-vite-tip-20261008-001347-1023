import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ResultPanel from './ResultPanel';
import type { TipFormState } from '../types';

function formState(overrides: Partial<TipFormState> = {}): TipFormState {
  return {
    amount: '',
    tipPercent: '',
    people: '',
    touched: { amount: false, tipPercent: false, people: false },
    submitted: false,
    ...overrides,
  };
}

describe('ResultPanel', () => {
  it('renders the neutral state with three labelled rows and no error', () => {
    const html = renderToStaticMarkup(<ResultPanel state={formState()} />);
    expect(html).toContain('Trinkgeld');
    expect(html).toContain('Gesamtbetrag');
    expect(html).toContain('Betrag pro Person');
    expect(html).toContain('—');
    expect(html).not.toContain('error-summary');
  });

  it('shows the three money values once the input is valid', () => {
    const html = renderToStaticMarkup(
      <ResultPanel state={formState({ amount: '100', tipPercent: '10', people: '2' })} />,
    );
    expect(html).toContain('10,00');
    expect(html).toContain('110,00');
    expect(html).toContain('55,00');
    expect(html).toContain('is-accent');
    expect(html).not.toContain('error-summary');
  });

  it('replaces the values with the error summary for the first error', () => {
    const html = renderToStaticMarkup(
      <ResultPanel
        state={formState({
          amount: '100',
          tipPercent: '10',
          people: '',
          touched: { amount: false, tipPercent: false, people: true },
        })}
      />,
    );
    expect(html).toContain('error-summary');
    expect(html).toContain('role="alert"');
    expect(html).not.toContain('result-value');
    expect(html).not.toContain('Trinkgeld');
  });

  it('stays neutral while an untouched field is still empty', () => {
    const html = renderToStaticMarkup(
      <ResultPanel state={formState({ amount: '', tipPercent: '10', people: '2' })} />,
    );
    expect(html).not.toContain('error-summary');
    expect(html).toContain('—');
  });
});
