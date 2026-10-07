import { calculateTip, validateTipInput } from '../lib/tip';
import type { TipFormState, TipInput } from '../types';
import './ResultPanel.css';

const euroFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

function formatMoney(value: number): string {
  return euroFormatter.format(value);
}

function parseNumber(raw: string): number {
  return Number(raw.trim());
}

function WarningGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      className="glyph"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="8" r="7" fill="#B42318" />
      <path d="M8 4.5v3.8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.2" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

function ResultRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="result-row">
      <span className="result-label">{label}</span>
      <span className={accent ? 'result-value is-accent' : 'result-value'}>{value}</span>
    </div>
  );
}

export default function ResultPanel({ state }: { state: TipFormState }) {
  const error = validateTipInput(state);
  const hasInteracted =
    state.submitted ||
    state.touched.amount ||
    state.touched.tipPercent ||
    state.touched.people;

  if (error && hasInteracted) {
    return (
      <div className="error-summary" role="alert">
        <WarningGlyph />
        <span>{error.message}</span>
      </div>
    );
  }

  const input: TipInput = {
    amount: parseNumber(state.amount),
    tipPercent: parseNumber(state.tipPercent),
    people: parseNumber(state.people),
  };
  const result = error ? null : calculateTip(input);

  return (
    <section className="result-panel" aria-live="polite" aria-atomic="true">
      <ResultRow label="Trinkgeld" value={result ? formatMoney(result.tip) : '—'} />
      <ResultRow
        label="Gesamtbetrag"
        value={result ? formatMoney(result.total) : '—'}
        accent
      />
      <ResultRow
        label="Betrag pro Person"
        value={result ? formatMoney(result.perPerson) : '—'}
      />
    </section>
  );
}
