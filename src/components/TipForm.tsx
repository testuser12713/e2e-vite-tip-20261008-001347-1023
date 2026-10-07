import type { TipFormState } from '../types';

export default function TipForm({
  state,
  onChange,
}: {
  state: TipFormState;
  onChange: (next: TipFormState) => void;
}) {
  void state;
  void onChange;
  return null;
}
