export type TipInput = {
  amount: number;
  tipPercent: number;
  people: number;
};

export type TipResult = {
  tip: number;
  total: number;
  perPerson: number;
};

export type TipFormState = {
  amount: string;
  tipPercent: string;
  people: string;
  touched: {
    amount: boolean;
    tipPercent: boolean;
    people: boolean;
  };
  submitted: boolean;
};

export type ValidationError = {
  field: 'amount' | 'tipPercent' | 'people';
  message: string;
};

export const initialTipFormState: TipFormState = {
  amount: '',
  tipPercent: '',
  people: '',
  touched: { amount: false, tipPercent: false, people: false },
  submitted: false,
};
