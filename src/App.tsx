import { useState } from 'react';
import { initialTipFormState, type TipFormState } from './types';
import TipForm from './components/TipForm';
import ResultPanel from './components/ResultPanel';
import './App.css';

export default function App() {
  const [state, setState] = useState<TipFormState>(initialTipFormState);

  return (
    <main className="page">
      <section className="card">
        <header className="page-header">
          <h1 className="page-title">Trinkgeld-Rechner</h1>
        </header>
        <TipForm state={state} onChange={setState} />
        <ResultPanel state={state} />
      </section>
    </main>
  );
}
