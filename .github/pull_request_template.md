# PR Summary

## What changed

<!-- Explain in plain language what you changed and why. -->

## Problem solved

<!-- What user/business problem does this PR solve? -->

## Scope

- Type: <!-- feature | improvement | fix | refactor | docs -->
- Area: <!-- landing | onboarding | pricing | faq | analytics | seo | tests | docs -->
- Language impact: <!-- ES | EN | ES+EN -->

## Conversion impact

<!-- Required for landing-related PRs. -->

- Funnel step impacted: <!-- e.g. Hero CTA, Pricing CTA, FAQ objection handling -->
- Expected KPI impact:
  - `cta_free_click_rate`: <!-- up/down/no change -->
  - `cta_premium_click_rate`: <!-- up/down/no change -->
  - `pricing_view_to_whatsapp_start`: <!-- up/down/no change -->
  - `faq_open_30_messages`: <!-- up/down/no change -->
  - `conversation_started`: <!-- up/down/no change -->

## Base concept alignment

<!-- Confirm alignment with docs/landing-base-solution-360.md -->

- [ ] Keeps the primary objective: web visit -> WhatsApp conversation start.
- [ ] Keeps Free message clear: service continues in Lite mode after 30 smart messages.
- [ ] Keeps CTA consistency: `Empezar Gratis` and `Desbloquear Premium` where applicable.
- [ ] Keeps mobile-first behavior and touch-friendly interactions.

## Section-by-section impact

<!-- Mark sections touched and summarize each change. -->

- [ ] Hero
- [ ] Pricing
- [ ] How we transform
- [ ] Safety first
- [ ] Testimonials / GRIT
- [ ] FAQ
- [ ] Final CTA / Sticky CTA
- [ ] Other: <!-- specify -->

## Technical details

### Files touched

<!-- List key files only. -->

### Architecture notes

<!-- Explain important decisions, tradeoffs, and assumptions. -->

### Analytics/events

<!-- Mention new/changed events and placement attribution. -->

## Visual evidence

<!-- Required for UI changes. -->

- Mobile screenshots/GIF:
- Desktop screenshots/GIF:

## QA checklist

- [ ] `npm run type-check`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Manual check: Hero CTA opens onboarding flow
- [ ] Manual check: Pricing Free CTA opens onboarding flow
- [ ] Manual check: Pricing Premium CTA opens onboarding flow
- [ ] Manual check: FAQ critical answers are visible and correct
- [ ] Manual check: ES and EN copies are consistent
- [ ] Manual check: mobile layout has no dead vertical spaces

## Risk assessment

- Risk level: <!-- low | medium | high -->
- Main risks:
- Mitigation:
- Rollback plan:

## Database and infra safety

- [ ] No database changes.
- [ ] No migrations.
- [ ] No secrets added.
- [ ] Uses only approved environment variables (`VITE_*`).

## Documentation updates

- [ ] Updated README if needed.
- [ ] Updated `docs/landing-base-solution-360.md` if concept/structure changed.
- [ ] Added comments only where necessary for maintainability.

## Related links

- Issue/ticket:
- Design/reference:
- Other PRs/dependencies:
