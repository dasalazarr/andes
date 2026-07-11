# Proposal: Página /embajadores + atribución de origen en onboarding

## Why

El pivote a club de experiencia en Pamplona (ver `docs/prd-experience-club-pamplona-2026-07.md`) necesita reclutar 5 embajadoras fundadoras antes del 31-ago y medir qué usuarias llegan de qué embajadora/evento. Hoy no existe la página ni forma alguna de atribuir origen: `POST /onboarding/start` solo acepta `intent: free|premium`.

## What Changes

**Frontend (`andes/andes/`)**
- Nueva ruta `/embajadores` (ES) en `App.tsx`: hero aspiracional, qué es ser embajadora, beneficios (Premium gratis, eventos, referidos "próximamente", kit), cómo funciona en 3 pasos, social proof ("primeras 5 fundadoras"), FAQ corto, CTA por WhatsApp.
- Copy nuevo `ambassadorsContent` en `src/data/content.tsx` (solo ES en esta fase).
- CTA vía `startOnboarding('ambassador')` en `src/lib/onboarding.ts`, que pasa a aceptar `source` opcional.
- Eventos `ambassador_page_view` y `ambassador_cta_click` en `src/lib/analytics.ts`.
- SEO en `SeoManager.tsx` + sitemap (automático vía `scripts/generate-sitemap.js`).

**Backend (`v3/v3/` — change set acoplado, mismo despliegue)**
- `POST /onboarding/start` acepta `intent: 'ambassador'` y `source?: string` (`event:{slug}` | `amb:{code}` | `landing`), codificados en el mensaje prellenado del deep link.
- El webhook captura el source del primer mensaje y lo persiste (`users.acquisition_source` — migración Drizzle propuesta, la ejecuta Diego).
- `intent: ambassador` genera mensaje "Quiero ser embajadora…" y NO entra al onboarding de plan (gestión manual).

## Non-goals

- Versión EN de la página (el tráfico objetivo es local).
- Sistema de % de referidos con liquidación (diseñar solo cuando haya ≥3 embajadoras activas trayendo usuarias).
- Gestor de eventos (grupo de WhatsApp + Luma bastan).

## Impact

- Specs afectadas: `onboarding-funnel` (esta repo) y `onboarding-contract` (v3) — el contrato gana un intent y un campo opcional, retrocompatible.
- Invariante intacta: `freemium-policy` no cambia; los beneficios de embajadora (Premium gratis) se activan manualmente vía `subscriptionStatus`.
- Riesgo principal: des-sync front/back del contrato → se mitiga desplegando backend primero (campo opcional = retrocompatible).
