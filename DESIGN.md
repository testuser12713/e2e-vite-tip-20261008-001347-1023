# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Calm light fintech minimalism: one centered white card on a soft grey canvas, a single deep-teal accent reserved for result values, quiet slate typography and hairline borders — as clear and trustworthy as a Stripe checkout, with zero decoration.

## Colors

- `--color-bg`: **#F5F7F8**
- `--color-surface`: **#FFFFFF**
- `--color-surface-subtle`: **#F1F5F7**
- `--color-fg`: **#0F1B1A**
- `--color-fg-muted`: **#5C6B70**
- `--color-accent`: **#0E7C6B**
- `--color-accent-hover`: **#0A6355**
- `--color-accent-active`: **#084F45**
- `--color-accent-subtle`: **#E6F4F1**
- `--color-border`: **#E3E8EA**
- `--color-border-strong`: **#CBD5D6**
- `--color-focus-ring`: **#0E7C6B33**
- `--color-danger`: **#B42318**
- `--color-danger-subtle`: **#FEF3F2**
- `--color-disabled-bg`: **#EDF1F2**
- `--color-disabled-fg`: **#9AA6A9**

## Typography

- `font_family`: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
- `font_family_numeric`: "Inter", ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace
- `heading_weight`: 600
- `body_weight`: 400
- `label_weight`: 500
- `size_h1`: 24px
- `size_h2`: 18px
- `size_body`: 16px
- `size_label`: 13px
- `size_result`: 28px
- `line_height_body`: 1.5
- `line_height_heading`: 1.25
- `letter_spacing_heading`: -0.01em
- `numeric_features`: font-variant-numeric: tabular-nums on every money value so columns and live updates never jitter

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 6px
- `--radius-md`: 10px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Button

Primary ('Berechnen' fallback / any future action). padding 12px 24px, min-height 44px, radius md (10px), font size 16px weight 500, bg=accent #0E7C6B, fg=#FFFFFF, border none, cursor pointer, transition background-color 120ms ease. Hover: bg=accent-hover #0A6355. Active: bg=accent-active #084F45, transform translateY(1px). Focus-visible: 2px solid accent offset 2px (ring #0E7C6B33). Disabled: bg=disabled-bg #EDF1F2, fg=disabled-fg #9AA6A9, cursor not-allowed, no hover change, opacity 1 (colour change only, so disabled reads as deliberate). Since the app calculates live, the primary button is optional — if not rendered, no other control may look like a button.

### SecondaryButton

Ghost/quiet variant for a possible 'Reset' or 'Clear' control. padding 12px 20px, min-height 44px, radius md, bg transparent, fg=fg-muted #5C6B70, border 1px solid border #E3E8EA. Hover: bg=surface-subtle #F1F5F7, fg=fg. Active: bg #E7EDEE. Focus-visible: accent ring. Disabled: fg=disabled-fg, border #EDF1F2, cursor not-allowed.

### Input

Numeric text input (inputmode=decimal) for Betrag / Trinkgeld-Prozent / Personenzahl. height 44px min, padding 10px 12px, radius sm (6px), font size 16px, font-variant-numeric tabular-nums, bg=surface #FFFFFF, fg=fg. Border 1px solid border #E3E8EA. Hover: border-strong. Focus: border accent + box-shadow 0 0 0 3px focus-ring #0E7C6B33, no outline. Error state: border danger #B42318, focus shadow #B4231833, aria-invalid, aria-describedby pointing at the error text. Disabled: bg disabled-bg. Never colour-only signalling — border plus icon/text.

### Field

Wrapper for label + control + error. Label above the input, font size 13px weight 500, color fg-muted #5C6B70, margin-bottom 6px, associated via htmlFor/id. A right-aligned unit hint ('€' or '%') may sit inside the field at 13px in fg-muted. Error text below the input, margin-top 6px, font size 13px, color danger #B42318, preceded by a small warning glyph (not colour alone). Vertical gap between fields: 16px. Never render an error on first paint — the field is neutral until blur or submit.

### ErrorSummary

Optional single inline error block shown in place of the results when any input is invalid. bg=danger-subtle #FEF3F2, border 1px solid #F7D5D2, radius md, padding 12px 16px, fg=danger #B42318, font size 14px. Appears only after the user has edited a field or submitted; replaces the result values entirely (no greyed-out numbers behind it). Uses role=alert so screen readers announce it.

### ResultPanel

Card region holding the three outputs: Trinkgeld, Gesamtbetrag, Betrag pro Person. bg=surface-subtle #F1F5F7, border 1px solid border #E3E8EA, radius lg (16px), padding 24px. Each row: label (13px, fg-muted, weight 500) on the left, value (font size 28px for the dominant row, 20px for the others, weight 600, tabular-nums) right-aligned or below on narrow widths. Values use accent #0E7C6B for 'Gesamtbetrag' as the single highlighted figure; the other two stay fg #0F1B1A so the accent keeps its meaning. 12px vertical rhythm between rows, 1px border divider between them.

### Card

The single page container. bg=surface #FFFFFF, border 1px solid border #E3E8EA, radius lg (16px), padding 32px (24px below 640px), box-shadow 0 1px 2px rgba(15,27,26,0.04), 0 8px 24px rgba(15,27,26,0.05). Max-width 480px, centred horizontally with at least 24px side margin.

### PageHeader

h1 'Trinkgeld-Rechner' inside the Card, font size 24px weight 600, letter-spacing -0.01em, color fg. Optional subtitle line 14px fg-muted, margin-top 4px. margin-bottom 24px separating header from the form.

### LiveRegion

Off-screen politely-live wrapper (aria-live=polite, aria-atomic=true) around the ResultPanel values so each recomputation is announced once without stealing focus. Visual design unaffected — purely a behaviour contract for the developers.

## Layout Principles

- Single page, single column: page background #F5F7F8, one Card of max-width 480px, centred both axes (min-height 100vh, display flex, align-items center on tall viewports; top-aligned at 24px padding when the viewport is short).
- Breakpoints: one breakpoint at 640px. Below: card padding 24px, page side margin 16px, result values stack label-over-value full width. At/above 640px: card padding 32px, result rows sit label-left / value-right. No further breakpoints, no responsive navigation.
- Vertical rhythm: 32px header-to-form, 16px between fields, 24px form-to-result panel, 12px between result rows. Only the token spacing scale is used — no ad-hoc pixel values.
- Form direction: the three inputs are stacked top to bottom in the order Betrag → Trinkgeld-Prozent → Personenzahl, each full width, followed by the result panel. Inputs are never placed side by side.
- Every money value in the product is formatted identically and in exactly one place: de-DE locale, EUR, always two decimals, thousands and decimal separators per de-DE, via a shared helper using Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }) — output reads like '12,34 €' / '1.234,56 €'. Rounding is to whole cents first, formatting second. Percentages render as '15 %' and person counts as plain integers; durations/amounts elsewhere follow the same single-helper rule.
- Contrast and colour discipline: fg #0F1B1A on surface #FFFFFF and on #F1F5F7 both exceed 4.5:1; accent #0E7C6B is used for interactive affordance and the one highlighted total, never as a background for body text. Errors are signalled by border + glyph + text, never by colour alone.
- States are explicit: nothing is focus-trapped, every focusable control has a visible focus ring, and any control that cannot act is visibly disabled rather than silently inert.
- Motion is minimal: only 120ms colour/transform transitions on interactive states; no page transitions, no skeleton loaders, no animation on the live-updating numbers (tabular-nums keeps them stable instead).
