# Accessibility audit — ID TID Services

- **Date:** 2026-11-20 (15:22 local)
- **Page:** `http://localhost:5173/` (single-page site, whole document)
- **Engine:** axe-core 4.11.1, viewport 1024 × 900
- **Scope:** accessibility only

## Summary

Four violations were raised. All four have been fixed in the source; everything else
in the rule set (names and roles, labels, landmarks, lists, heading order, contrast,
image alt text, skip link, autocomplete, nested interactive controls) already passed.

| # | Rule | Impact | Status |
|---|------|--------|--------|
| 1 | `aria-prohibited-attr` | serious | Fixed |
| 2 | `definition-list` | serious | Fixed |
| 3 | `dlitem` | serious | Fixed |
| 4 | `region` | moderate | Fixed |

## 1. `aria-prohibited-attr` — star rating

`aria-label` was placed on a plain `div` in the testimonial rating, which has no role
to carry an accessible name.

**Fix:** the rating wrapper is now `role="img"` with `aria-label="Rated N out of 5"`,
so screen readers announce the rating once instead of reading five unlabelled icons.

File: `src/components/Testimonials.tsx`

## 2 & 3. `definition-list` / `dlitem` — contact details

The contact `<dl>` wrapped each row in `<div><icon /><div><dt/><dd/></div></div>`, so
`<dt>`/`<dd>` were nested two levels deep and no longer belonged to the list.

**Fix:** each row is now `<div><dt/><dd/></div>` — the only structure a `<dl>` permits —
with the icon inside the `<dt>` and the value indented to match.

File: `src/components/Contact.tsx`

## 4. `region` — floating WhatsApp control

The fixed WhatsApp link sat outside every landmark, so it was not reachable through
landmark navigation.

**Fix:** wrapped in `<aside aria-label="Quick contact">`, which exposes a complementary
landmark. Positioning is unchanged.

File: `src/components/WhatsAppFloatingButton.tsx`

## Notes

- Contrast was checked separately during the build and small labels were raised from
  40–60 % navy to 70 % navy to clear 4.5:1 on ivory and white surfaces.
- Colour contrast, form labels, landmark structure, list semantics, heading order and
  the skip link passed on the audited build.
- Re-run this audit after adding new sections or imagery.
