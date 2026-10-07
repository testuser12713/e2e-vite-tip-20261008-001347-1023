# Trinkgeld-Rechner

Eine Single-Page-Web-App zum Berechnen von Trinkgeld. Der Nutzer gibt den
Rechnungsbetrag, das Trinkgeld in Prozent und die Anzahl der Personen ein und
sieht unmittelbar das Trinkgeld, den Gesamtbetrag und den Betrag pro Person —
auf ganze Cent gerundet und im deutschen Währungsformat angezeigt. Die
Berechnungslogik ist in einer reinen, seiteneffektfreien Funktion gekapselt und
mit Vitest-Unit-Tests abgedeckt.

## Tech-Stack

- **Sprache:** TypeScript (strict)
- **Framework:** React 19
- **Build:** Vite
- **Tests:** Vitest
- **Laufzeit:** Browser

## Installation

Voraussetzung ist Node.js 20.19+ bzw. 22.12+.

```bash
npm ci
```

## Entwicklung starten

```bash
npm run dev
```

Anschließend die ausgegebene Adresse (standardmäßig `http://localhost:5173`) im
Browser öffnen.

## Produktions-Build

```bash
npm run build
```

Der Build legt die statischen Dateien in `dist/` ab. Zum lokalen Prüfen des
fertigen Builds:

```bash
npm run preview
```

`npm run preview` startet einen Server für die gebauten Dateien
(standardmäßig `http://localhost:4173`).

## Benutzung

Die Seite zeigt eine einzelne, zentrierte Karte mit drei Eingabefeldern:

1. **Betrag** — der Rechnungsbetrag in Euro.
2. **Trinkgeld-Prozent** — der gewünschte Trinkgeld-Anteil in Prozent (0–100).
3. **Personenzahl** — die Anzahl der Personen, unter denen geteilt wird (≥ 1).

Die Ergebnisse werden live und ohne Absenden neu berechnet:

- **Trinkgeld** — der Trinkgeld-Betrag.
- **Gesamtbetrag** — Betrag plus Trinkgeld.
- **Betrag pro Person** — Gesamtbetrag geteilt durch die Personenzahl.

Alle Geldwerte sind auf ganze Cent gerundet und im Format `12,34 €` (de-DE, EUR)
formatiert. Ungültige Eingaben (nicht-numerisch, negativ, Prozent außerhalb
0–100, Personenzahl kleiner 1 oder nicht ganzzahlig, leeres Pflichtfeld nach
Bearbeitung) zeigen eine sichtbare Fehlermeldung statt der Ergebniswerte. Vor
der ersten Eingabe bleibt das Formular neutral und zeigt keine Fehlermeldung.

## Tests

```bash
npm test
```

Führt die Vitest-Unit-Tests der Berechnungs- und Validierungslogik aus.

## Features

- Live-Berechnung von Trinkgeld, Gesamtbetrag und Betrag pro Person
- Rundung auf ganze Cent und deutsche Geldformatierung
- Validierung der Eingaben mit sichtbarer Fehlermeldung
- Neutraler Ausgangszustand ohne voreilige Fehlermeldungen
- Reine, React-freie Berechnungs- und Validierungsfunktionen mit Unit-Tests
- Zentrierte, responsive Karten-Oberfläche mit einheitlichen Design-Tokens
