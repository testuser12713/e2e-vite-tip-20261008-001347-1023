import type { ChangeEvent, FormEvent } from 'react';
import type { TipFormState } from '../types';
import styles from './TipForm.module.css';

type FieldName = 'amount' | 'tipPercent' | 'people';

function withTouched(
  touched: TipFormState['touched'],
  field: FieldName,
): TipFormState['touched'] {
  return { ...touched, [field]: true };
}

export default function TipForm({
  state,
  onChange,
}: {
  state: TipFormState;
  onChange: (next: TipFormState) => void;
}) {
  const handleChange =
    (field: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...state,
        [field]: event.target.value,
        touched: withTouched(state.touched, field),
      });
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange({
      ...state,
      touched: { amount: true, tipPercent: true, people: true },
      submitted: true,
    });
  };

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
      data-od-id="tip-form"
    >
      <div className={styles.field} data-od-id="field-amount">
        <label htmlFor="amount">Betrag</label>
        <div className={`${styles.inputWrap} ${styles.hasUnit}`}>
          <input
            id="amount"
            name="amount"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0,00"
            required
            value={state.amount}
            onChange={handleChange('amount')}
            data-od-id="input-amount"
          />
          <span className={styles.unitHint} aria-hidden="true">
            €
          </span>
        </div>
      </div>

      <div className={styles.field} data-od-id="field-percent">
        <label htmlFor="percent">Trinkgeld-Prozent</label>
        <div className={`${styles.inputWrap} ${styles.hasUnit}`}>
          <input
            id="percent"
            name="percent"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="10"
            required
            value={state.tipPercent}
            onChange={handleChange('tipPercent')}
            data-od-id="input-percent"
          />
          <span className={styles.unitHint} aria-hidden="true">
            %
          </span>
        </div>
      </div>

      <div className={styles.field} data-od-id="field-people">
        <label htmlFor="people">Personenzahl</label>
        <div className={styles.inputWrap}>
          <input
            id="people"
            name="people"
            className={styles.input}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="1"
            required
            value={state.people}
            onChange={handleChange('people')}
            data-od-id="input-people"
          />
        </div>
      </div>
    </form>
  );
}
